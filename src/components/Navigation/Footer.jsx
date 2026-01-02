import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
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
                            <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                                About
                            </Link>
                            <Link component={RouterLink} to="/projects" color="inherit" underline="hover">
                                Projects
                            </Link>
                            <Link component={RouterLink} to="/login" color="inherit" underline="hover">
                                Login
                            </Link>
                        </Box>
                    </Grid>

                    {/* Column 3 - Contact Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Contact
                        </Typography>
                        <Typography variant="body2">Email: vikramsinghkv496@gmail.com</Typography>
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
                            <IconButton
                                color="inherit"
                                size="small"
                                href="https://www.linkedin.com/in/vikram-singh-panwar-994ba4386"
                                component="a"
                                target="_blank"
                                rel="noopener noreferrer"

                            >
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
