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
import { motion } from "framer-motion";
import ThemeToggleButton from "../Common/Button";

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Projects", path: "/projects" },
        { title: "About", path: "/about" },
        { title: "Login", path: "/login" },
    ];

    // Animation for drop-in 1 by 1
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.55,
            },
        },
    };

    // Strong bounce + slow drop animation
    const itemVariants = {
        hidden: { y: -40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 6,
                duration: 0.8,
            },
        },
    };

    return (
        <>
            <AppBar
                position="absolute"
                elevation={0}
                sx={{
                    background: "transparent",
                    boxShadow: "none",
                    zIndex: 1000,
                }}
            >
                <Toolbar sx={{ position: "relative" }}>
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{ textDecoration: "none", color: "white", fontWeight: 700 }}
                    >
                        MyPortfolio
                    </Typography>

                    {/* Center Nav (md+) */}
                    <Box
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            gap: 3,
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {navLinks.map((link) =>
                        (<motion.div key={link.title} variants={itemVariants}>
                            <Button component={Link} to={link.path}
                                sx={{
                                    position: "relative", fontSize: "16px", color: "#454545", px: 2, "&:hover":
                                        { backgroundColor: "transparent", },
                                    "&::after": {
                                        content: '""', position: "absolute", width: "0%",
                                        height: "2px", left: 0, bottom: -2, backgroundColor: "#f5f570ff",
                                        transition: "0.3s ease",
                                    },
                                    "&:hover::after": { width: "100%", },
                                }} >
                                {link.title}
                            </Button>
                        </motion.div>
                        ))}
                    </Box>

                    {/* Right-side actions (xs / sm) */}
                    <Box
                        sx={{
                            marginLeft: "auto",
                            display: { xs: "flex", md: "none" },
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <IconButton
                            sx={{ color: "white" }}
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <ThemeToggleButton />
                    </Box>
                </Toolbar>

            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 250 }}>
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
            </Drawer>
        </>
    );
}
