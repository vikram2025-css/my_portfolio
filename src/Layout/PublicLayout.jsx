import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";
import { Box } from "@mui/material";

export default function PublicLayout() {
    return (
        <>

            <Box sx={{ minHeight: "100vh" }}>
                <Navbar />
                <Box component="main" sx={{ flex: 1, minHeight: "80vh" }}>
                    {/* 👇 All child pages will render here */}
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </>
    );
}
