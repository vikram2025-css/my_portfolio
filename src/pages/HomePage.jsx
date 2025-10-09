import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Stack,
    IconButton,
    Chip,
} from '@mui/material';
import {
    GitHub,
    LinkedIn,
    Email,
    KeyboardArrowDown,
    Code,
    Rocket,
    BrushOutlined,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';

import { useTheme, useMediaQuery } from '@mui/material';

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const float = keyframes`
  from { transform: translateY(0px); }
  to   { transform: translateY(40px); }
`;


    return (
        <Box
            id="home"
            sx={{

                display: 'flex',

                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
        >



            {/* --- Content --- */}
            <Container sx={{ position: 'relative', zIndex: 2 }}>
                <Grid container spacing={6} alignItems="center" sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    {/* Left Side */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Chip
                                icon={<Code sx={{ color: 'white !important' }} />}
                                label="Available for Freelance"
                                sx={{
                                    mb: 3,
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    backdropFilter: 'blur(10px)',
                                    fontWeight: 600,
                                }}
                            />

                            <Typography
                                variant={isMobile ? 'h3' : 'h2'}
                                sx={{
                                    fontWeight: 800,
                                    lineHeight: 1.2,
                                    color: 'white',
                                    mb: 1.5,
                                }}
                            >
                                Hi, I'm{' '}
                                <Box
                                    component="span"
                                    sx={{
                                        background:
                                            'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.7))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Vikram Singh Panwar
                                </Box>
                            </Typography>

                            {/* Typewriter-style subtitle */}
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'rgba(255,255,255,0.85)',
                                    mb: 3,
                                    fontFamily: 'monospace',
                                    borderRight: '2px solid white',
                                    display: 'inline-block',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    animation: 'typing 3s steps(40, end), blink 1s step-end infinite alternate',
                                    '@keyframes typing': {
                                        from: { width: 0 },
                                        to: { width: '100%' },
                                    },
                                    '@keyframes blink': {
                                        from: { borderColor: 'transparent' },
                                        to: { borderColor: 'white' },
                                    },
                                }}
                            >
                                Frontend Developer • React Enthusiast • UI Engineer
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255,255,255,0.9)',
                                    mb: 4,
                                    maxWidth: 500,
                                    lineHeight: 1.7,
                                }}
                            >
                                I craft seamless, high-performance web experiences with React,
                                Material-UI, and modern design principles. Let’s build something
                                elegant and functional together.
                            </Typography>

                            {/* Feature Badges */}
                            <Stack direction="row" flexWrap="wrap" gap={1.5} mb={4}>
                                {[
                                    { icon: <Code />, text: 'Clean Code' },
                                    { icon: <Rocket />, text: 'High Performance' },
                                    { icon: <BrushOutlined />, text: 'Modern Aesthetic' },
                                ].map((f, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            px: 2,
                                            py: 1,
                                            borderRadius: 2,
                                            bgcolor: 'rgba(255,255,255,0.12)',
                                            color: 'white',
                                            backdropFilter: 'blur(6px)',
                                        }}
                                    >
                                        {f.icon}
                                        <Typography variant="body2" fontWeight={600}>
                                            {f.text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>

                            {/* Buttons */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => scrollToSection('projects')}
                                    sx={{
                                        bgcolor: 'white',
                                        color: theme.palette.primary.main,
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        px: 4,
                                        py: 1.5,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                                        },
                                    }}
                                >
                                    View My Work
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => scrollToSection('contact')}
                                    sx={{
                                        borderColor: 'white',
                                        color: 'white',
                                        borderWidth: 2,
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        px: 4,
                                        py: 1.5,
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.15)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    Contact Me
                                </Button>
                            </Stack>

                            {/* Social Links */}
                            <Stack direction="row" spacing={1.5} mt={4}>
                                {[
                                    { icon: <GitHub />, link: 'https://github.com/yourusername' },
                                    { icon: <LinkedIn />, link: 'https://linkedin.com/in/yourusername' },
                                    { icon: <Email />, link: 'mailto:your.email@example.com' },
                                ].map((s, i) => (
                                    <IconButton
                                        key={i}
                                        href={s.link}
                                        target="_blank"
                                        sx={{
                                            color: 'white',
                                            bgcolor: 'rgba(255,255,255,0.15)',
                                            '&:hover': {
                                                transform: 'scale(1.15)',
                                                bgcolor: 'rgba(255,255,255,0.3)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {s.icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </motion.div>
                    </Grid>

                    {/* Right Side (Image) */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            style={{ position: 'relative' }}
                        >
                            <Box
                                component="img"
                                src="/images/vikram.jpg"
                                alt="Vikram Singh Panwar - Frontend Developer"
                                sx={{
                                    width: '100%',
                                    maxWidth: 380,
                                    borderRadius: '24px',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                                    '&:hover': {
                                        transform: 'rotateY(3deg) scale(1.05)',
                                        boxShadow: '0 25px 70px rgba(0,0,0,0.6)',
                                    },
                                    display: 'block',
                                    mx: 'auto',
                                }}
                            />

                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 20,
                                    right: 20,
                                    background: 'white',
                                    borderRadius: 16,
                                    padding: '16px 20px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                    minWidth: 160,
                                }}
                            >
                                <Typography variant="h4" color="primary" fontWeight={800}>
                                    50+
                                </Typography>
                                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                    Projects Completed
                                </Typography>
                            </motion.div>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, -12, 0] }}       // float up and down
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    left: '50%',
                    x: '-50%',                      // centers horizontally
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                }}
                onClick={() => scrollToSection('about')}
            >
                <Typography
                    variant="caption"
                    sx={{
                        color: 'white',
                        fontWeight: 600,
                        letterSpacing: 1,
                        userSelect: 'none',
                    }}
                >
                    SCROLL DOWN
                </Typography>
                <KeyboardArrowDown sx={{ color: 'white', fontSize: 32 }} />
            </motion.div>


        </Box>
    );
}
