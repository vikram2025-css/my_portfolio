"use client";
import React, { useRef } from "react";
import { Box, Grid, Typography, Card, CardContent, Avatar, LinearProgress, Rating } from "@mui/material";
import { motion, useInView } from "framer-motion";

export default function ClientsSection() {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const clients = [
        { name: "TechWave", project: "SaaS Dashboard", rating: 4.8, logo: "https://via.placeholder.com/80" },
        { name: "Designify", project: "Portfolio Website", rating: 5.0, logo: "https://via.placeholder.com/80" },
        { name: "ShopEase", project: "E-commerce Frontend", rating: 4.9, logo: "https://via.placeholder.com/80" },
    ];

    const skills = [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Material UI", level: 95 },
        { name: "JavaScript (ES6+)", level: 88 },
    ];

    return (
        <Box sx={{ py: 10, px: { xs: 3, md: 8 }, backgroundColor: "#f4f6f8", overflow: "hidden" }}>
            {/* Drop Animation for Heading */}
            <AnimatedItem>
                <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                    Clients & Experience
                </Typography>
            </AnimatedItem>

            <AnimatedItem delay={0.2}>
                <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    maxWidth="700px"
                    mx="auto"
                    mb={6}
                >
                    Over the past few months, I’ve collaborated with multiple startups and
                    brands to design and develop seamless, high-performing web experiences.
                </Typography>
            </AnimatedItem>

            {/* Clients */}
            <Grid container spacing={4} justifyContent="center" mb={8}>
                {clients.map((client, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <AnimatedItem delay={i * 0.1}>
                            <Card
                                sx={{
                                    textAlign: "center",
                                    borderRadius: 4,
                                    boxShadow: 3,
                                    transition: "0.3s",
                                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                                }}
                            >
                                <CardContent>
                                    <Avatar
                                        src={client.logo}
                                        alt={client.name}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            mx: "auto",
                                            mb: 2,
                                            border: "2px solid #1976d2",
                                        }}
                                    />
                                    <Typography variant="h6">{client.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {client.project}
                                    </Typography>
                                    <Box mt={1}>
                                        <Rating value={client.rating} precision={0.1} readOnly />
                                    </Box>
                                </CardContent>
                            </Card>
                        </AnimatedItem>
                    </Grid>
                ))}
            </Grid>

            {/* Skills */}
            <AnimatedItem>
                <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                    My Skills
                </Typography>
            </AnimatedItem>

            <Grid container spacing={4} maxWidth="800px" mx="auto">
                {skills.map((skill, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                        <AnimatedItem delay={i * 0.1}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {skill.name}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={skill.level}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        mt: 1,
                                        backgroundColor: "#e0e0e0",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: "#1976d2",
                                        },
                                    }}
                                />
                            </Box>
                        </AnimatedItem>
                    </Grid>
                ))}
            </Grid>

            {/* Experience Summary */}
            <AnimatedItem>
                <Box mt={8} textAlign="center">
                    <Typography variant="h6" fontWeight="bold">
                        Experience: <span style={{ color: "#1976d2" }}>4–5 Months</span>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        maxWidth="600px"
                        mx="auto"
                        mt={1}
                    >
                        Focused on crafting dynamic, responsive, and user-friendly interfaces
                        using React, Next.js, and Material UI. Continuously improving through
                        real-world client projects and modern UI practices.
                    </Typography>
                </Box>
            </AnimatedItem>
        </Box>
    );
}

// 🔁 Reusable component that animates every time it enters view
function AnimatedItem({ children, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.4 });

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } },
            }}
            animate={isInView ? "visible" : "hidden"} // toggles back and forth
            initial="hidden"
        >
            {children}
        </motion.div>
    );
}
