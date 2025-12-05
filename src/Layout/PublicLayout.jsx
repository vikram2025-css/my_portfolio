import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import { Box } from "@mui/material";
import Butterflies from "../components/Butterfly/Butterflies";

export default function PublicLayout() {
    return (
        <>
            <Butterflies />
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
