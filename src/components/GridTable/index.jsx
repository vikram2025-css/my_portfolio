import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Grid,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    Pagination,
} from "@mui/material";

export default function GridTable() {
    const [view, setView] = useState("card");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [columns, setColumns] = useState({
        id: true,
        title: true,
        category: true,
        price: true,
        rating: false,
    });

    const [form, setForm] = useState({ id: null, title: "", price: "", category: "", image: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));

        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(["all", ...data]));
    }, []);

    const filteredProducts = products.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (typeof aVal === "string") {
            return sortConfig.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        } else if (typeof aVal === "number") {
            return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        return 0;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const goToPage = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
        setSortConfig({ key, direction });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),
            title: form.title,
            price: parseFloat(form.price),
            category: form.category || "general",
            image: form.image || "https://via.placeholder.com/150",
        };
        setProducts([...products, newProduct]);
        setForm({ id: null, title: "", price: "", category: "", image: "" });
    };

    const handleEditProduct = (product) => {
        setIsEditing(true);
        setForm(product);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        setProducts(products.map((p) => (p.id === form.id ? form : p)));
        setForm({ id: null, title: "", price: "", category: "", image: "" });
        setIsEditing(false);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
        setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    };

    const handleBulkDelete = () => {
        setProducts(products.filter((p) => !selectedProducts.includes(p.id)));
        setSelectedProducts([]);
    };

    const toggleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map((p) => p.id));
        }
    };

    const toggleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    const handleDownloadReport = () => {
        const csvRows = [];
        const headers = ["ID", "Title", "Category", "Price"];
        csvRows.push(headers.join(","));
        sortedProducts.forEach((p) => {
            csvRows.push(`${p.id},"${p.title.replace(/"/g, '""')}",${p.category},${p.price}`);
        });
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "products_report.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Box p={4} backgroundColor="#f5dbdb57">
            <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
                🛍 Product Manager
            </Typography>

            {/* Controls */}
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={4} gap={2}>
                <TextField
                    label="Search products..."
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "30%" } }}
                />

                <Select
                    size="small"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    sx={{ minWidth: 120 }}
                >
                    {categories.map((cat, i) => (
                        <MenuItem key={i} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>

                <Box display="flex" gap={1}>
                    <Button
                        variant={view === "card" ? "contained" : "outlined"}
                        onClick={() => setView("card")}
                        size="small"
                    >
                        Card View
                    </Button>
                    <Button
                        variant={view === "table" ? "contained" : "outlined"}
                        onClick={() => setView("table")}
                        size="small"
                    >
                        Table View
                    </Button>
                </Box>
            </Box>

            {/* Sort + Report Controls */}
            <Box display="flex" flexWrap="wrap" alignItems="center" gap={2} mb={3}>
                <Typography fontWeight="medium">Sort By:</Typography>
                <Select
                    size="small"
                    value={sortConfig.key}
                    onChange={(e) => handleSort(e.target.value)}
                    sx={{ minWidth: 140 }}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="id">ID</MenuItem>
                </Select>

                {sortConfig.key && (
                    <Button
                        onClick={() =>
                            setSortConfig({
                                ...sortConfig,
                                direction: sortConfig.direction === "asc" ? "desc" : "asc",
                            })
                        }
                        size="small"
                        variant="outlined"
                    >
                        {sortConfig.direction === "asc" ? "▲ Asc" : "▼ Desc"}
                    </Button>
                )}

                <Box flexGrow={1} />
                <Button variant="contained" color="success" onClick={handleDownloadReport} size="small">
                    ⬇️ Download Report (CSV)
                </Button>
            </Box>

            {/* Product Form */}
            <Box component="form" onSubmit={isEditing ? handleUpdateProduct : handleAddProduct} mb={5} p={3} borderRadius={2} border="1px solid #ea3c3cff" backgroundColor="#fdfcf8ff">
                <Typography variant="h6" mb={2} fontWeight="bold">
                    {isEditing ? "Update Product" : "Add Product"}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    <TextField
                        label="Title"
                        size="small"
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        sx={{ flex: "1 1 25%" }}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        size="small"
                        required
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        sx={{ flex: "1 1 25%" }}
                    />
                    <TextField
                        label="Category"
                        size="small"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        sx={{ flex: "1 1 25%" }}
                    />
                    <TextField
                        label="Image URL"
                        size="small"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        sx={{ flex: "1 1 25%" }}
                    />
                    <Button type="submit" variant="contained" color="success" sx={{ minWidth: 100 }}>
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </Box>
            </Box>

            {/* Bulk Delete */}
            {selectedProducts.length > 0 && (
                <Box mb={4}>
                    <Button variant="contained" color="error" onClick={handleBulkDelete}>
                        Delete Selected ({selectedProducts.length})
                    </Button>
                </Box>
            )}

            {/* Views */}
            {view === "card" ? (
                <Grid container spacing={3} justifyContent="center">
                    {currentProducts.map((p) => (
                        <Grid item xs={12} sm={6} md={6} lg={3} key={p.id}>
                            <Card
                                sx={{
                                    width: 380,
                                    height: 360,
                                    position: "relative",
                                    display: "flex",
                                    backgroundColor: "#f6e3f8ff",
                                    flexDirection: "column",

                                    alignItems: "center",


                                }}
                            >
                                <Checkbox
                                    checked={selectedProducts.includes(p.id)}
                                    onChange={() => toggleSelectProduct(p.id)}
                                    sx={{ position: "absolute", top: 8, left: 8, zIndex: 10 }}
                                />
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={p.image}
                                    alt={p.title}
                                    sx={{ objectFit: "contain", p: 1 }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="semibold"
                                        gutterBottom
                                        sx={{ maxWidth: '100%', whiteSpace: 'normal', wordBreak: 'break-word' }}
                                    >
                                        {p.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ${p.price}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {p.category}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="warning" variant="contained" onClick={() => handleEditProduct(p)}>
                                        Edit
                                    </Button>
                                    <Button size="small" color="error" variant="contained" onClick={() => handleDeleteProduct(p.id)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </TableCell>
                                {columns.id && (
                                    <TableCell sortDirection={sortConfig.key === "id" ? sortConfig.direction : false}>
                                        <TableSortLabel
                                            active={sortConfig.key === "id"}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort("id")}
                                        >
                                            ID
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                {columns.title && (
                                    <TableCell sortDirection={sortConfig.key === "title" ? sortConfig.direction : false}>
                                        <TableSortLabel
                                            active={sortConfig.key === "title"}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort("title")}
                                        >
                                            Name
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                {columns.category && (
                                    <TableCell sortDirection={sortConfig.key === "category" ? sortConfig.direction : false}>
                                        <TableSortLabel
                                            active={sortConfig.key === "category"}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort("category")}
                                        >
                                            Category
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                {columns.price && (
                                    <TableCell sortDirection={sortConfig.key === "price" ? sortConfig.direction : false}>
                                        <TableSortLabel
                                            active={sortConfig.key === "price"}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort("price")}
                                        >
                                            Price
                                        </TableSortLabel>
                                    </TableCell>
                                )}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentProducts.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedProducts.includes(p.id)}
                                            onChange={() => toggleSelectProduct(p.id)}
                                        />
                                    </TableCell>
                                    {columns.id && <TableCell>{p.id}</TableCell>}
                                    {columns.title && <TableCell>{p.title}</TableCell>}
                                    {columns.category && <TableCell>{p.category}</TableCell>}
                                    {columns.price && <TableCell>${p.price}</TableCell>}
                                    <TableCell>
                                        <Button size="small" color="warning" variant="contained" onClick={() => handleEditProduct(p)} sx={{ mr: 1 }}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="error" variant="contained" onClick={() => handleDeleteProduct(p.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, page) => goToPage(page)}
                        color="primary"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}

            {filteredProducts.length === 0 && (
                <Typography align="center" mt={4} color="text.secondary">
                    No products found
                </Typography>
            )}
        </Box>
    );
}
