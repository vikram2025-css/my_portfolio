import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Projects", path: "/projects" },
        { title: "About", path: "/about" },

        { title: "Login", path: "/login" },
    ];

    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    {/* Logo / Brand */}
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
                    >
                        MyPortfolio
                    </Typography>

                    {/* Desktop Links */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                        {navLinks.map((link) => (
                            <Button
                                key={link.title}
                                component={Link}
                                to={link.path}
                                color="inherit"
                                sx={{
                                    backgroundColor: "transparent",
                                    "&:hover": {
                                        backgroundColor: "transparent", // 🔥 removes the hover bg
                                    },
                                }}
                            >
                                {link.title}
                            </Button>
                        ))}
                    </Box>

                    {/* Hamburger Icon */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: "flex", md: "none" } }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar >

            {/* Mobile Drawer */}
            < Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)
                }
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setDrawerOpen(false)}
                    onKeyDown={() => setDrawerOpen(false)}
                >
                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.title} disablePadding>
                                <ListItemButton component={Link} to={link.path}>
                                    <ListItemText primary={link.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer >
        </>
    );
}
