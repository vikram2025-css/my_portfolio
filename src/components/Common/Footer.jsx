import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "#0d0d0d",
                color: "#fff",
                py: 6,
                px: { xs: 2, sm: 4 },

            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Column 1 - About */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            MyPortfolio
                        </Typography>
                        <Typography variant="body2" color="gray">
                            Building modern web experiences with creativity and code.
                        </Typography>
                    </Grid>

                    {/* Column 2 - Quick Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Quick Links
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="/about" color="inherit" underline="hover">
                                About
                            </Link>
                            <Link href="/projects" color="inherit" underline="hover">
                                Projects
                            </Link>
                            <Link href="/login" color="inherit" underline="hover">
                                Login
                            </Link>
                        </Box>
                    </Grid>

                    {/* Column 3 - Contact Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Contact
                        </Typography>
                        <Typography variant="body2">Email: youremail@example.com</Typography>
                        <Typography variant="body2">Phone: +91 98765 43210</Typography>
                    </Grid>

                    {/* Column 4 - Socials */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Follow Me
                        </Typography>
                        <Box>
                            <IconButton color="inherit" size="small" href="#">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit" size="small" href="#">
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit" size="small" href="#">
                                <LinkedIn />
                            </IconButton>
                            <IconButton color="inherit" size="small" href="#">
                                <Instagram />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* Bottom line */}
                <Box sx={{ textAlign: "center", mt: 6, borderTop: "1px solid #333", pt: 3 }}>
                    <Typography variant="body2" color="gray">
                        © {new Date().getFullYear()} MyPortfolio. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
