import React from 'react';
import { Link } from "react-router-dom";

import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Avatar,
    Chip,
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Code,
    Devices,
    Speed,
    Psychology
} from '@mui/icons-material';

export default function About() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const skills = [
        'JavaScript', 'HTML5', 'CSS3', 'React', 'Next.js', 'TypeScript', 'Material-UI', 'Tailwind CSS', 'Shadcn Ui',
        'Framer Motion', 'Git', 'GitLab', 'Jira', 'REST APIs', 'Zustand',
        'Redux toolkit'
    ];

    const strengths = [
        {
            icon: <Code sx={{ fontSize: 40 }} />,
            title: 'Clean Code',
            description: 'Writing maintainable, scalable code following best practices'
        },
        {
            icon: <Devices sx={{ fontSize: 40 }} />,
            title: 'Responsive Design',
            description: 'Creating seamless experiences across all devices'
        },
        {
            icon: <Speed sx={{ fontSize: 40 }} />,
            title: 'Performance',
            description: 'Optimizing applications for speed and efficiency'
        },
        {
            icon: <Psychology sx={{ fontSize: 40 }} />,
            title: 'Problem Solving',
            description: 'Approaching challenges with creative solutions'
        }
    ];

    return (
        <Box
            id="about"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: '80px 24px 80px', md: '80px 24px 80px' },
                position: 'relative',
                overflow: 'hidden',


                // ✅ Background image properties
                //backgroundImage: `url('/images/bg-image.webp')`,
                backgroundImage: `url('/images/hero.webp')`,
                backgroundSize: 'cover',        // Cover the entire Box
                backgroundPosition: 'center',   // Center the image
                backgroundRepeat: 'no-repeat',  // Avoid repeating
            }}
        >
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Avatar
                        src="images/profile2.webp"
                        alt="Profile"
                        sx={{
                            width: { xs: 120, md: 150 },
                            height: { xs: 120, md: 150 },
                            margin: '0 auto',
                            mb: 3,
                            border: `2px solid ${theme.palette.primary.main}`
                        }}
                    />
                    <Typography
                        variant={isMobile ? 'h3' : 'h2'}
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 700 }}
                    >
                        About Me
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: 'auto' }}
                    >
                        Frontend Developer | React Specialist | UI/UX Enthusiast
                    </Typography>
                </Box>

                {/* Introduction Section */}
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 5 },
                        mb: 6,
                        borderRadius: 2,
                        transition: "all 0.3s ease", // smooth animation
                        "&:hover": {
                            transform: "translateY(-6px)", // lift up slightly
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // stronger shadow
                            backgroundColor: "rgba(255, 255, 255, 0.95)", // subtle bg effect
                        },
                    }}
                >
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}
                    >
                        Hi! I'm a passionate Frontend Developer with expertise in building modern,
                        responsive web applications. I specialize in React and Material-UI,
                        creating intuitive user interfaces that deliver exceptional user experiences.
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}
                    >
                        With a strong foundation in JavaScript and a keen eye for design, I transform
                        ideas into functional, visually appealing applications. I'm dedicated to
                        writing clean, maintainable code and staying current with the latest
                        frontend technologies and best practices.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}
                    >
                        When I'm not coding, I enjoy exploring new technologies, contributing to
                        open-source projects, and continuously improving my development skills.
                    </Typography>
                </Paper>

                {/* Skills Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{ mb: 3, fontWeight: 600 }}
                    >
                        Technical Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {skills.map((skill, index) => (
                            <Chip
                                key={index}
                                label={skill}
                                color="primary"
                                variant="outlined"
                                sx={{
                                    fontSize: '1rem',
                                    py: 2.5,
                                    px: 1,
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                        color: 'white'
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Strengths Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{ mb: 4, fontWeight: 600 }}
                    >
                        What I Bring
                    </Typography>

                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="stretch"
                        sx={{
                            width: '100%',
                            m: 0,
                        }}
                    >
                        {strengths.map((strength, index) => (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                sm={6}
                                md={3}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 2,
                                        width: 230,          // full width of Grid column

                                        minHeight: 250,   // 👈 equal height & width (perfect square)
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <Box sx={{ color: 'primary.main', mb: 2 }}>{strength.icon}</Box>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                        {strength.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {strength.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CTA Section */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 8,
                        p: 4,
                        bgcolor: 'primary.main', // base color
                        borderRadius: 2,
                        color: 'white',
                        transition: "all 0.3s ease",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.1)", // initial shadow
                        "&:hover": {
                            transform: "translateY(-6px)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.3)", // gray/black shadow on hover
                            // optional: slightly brighter background
                            backgroundColor: 'primary.main',
                        },
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Let's Work Together
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Interested in collaborating? Let's create something amazing together.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            href="#contact"
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'grey.200'
                                }
                            }}
                        >
                            Contact Me
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            to="/projects"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            View Projects
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
