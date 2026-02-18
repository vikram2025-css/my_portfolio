import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import BrowserFrame from '../components/HeroSection/BrowserFrame';
import AnimatedText from '../components/HeroSection/AnimatedText';
import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatCard from "../components/HeroSection/Ai_bot/Bot";
import Map from '../components/Map';
import Butterflies from '../components/Butterfly/Butterflies';



const HomePage = () => {
    const [open, setOpen] = useState(false);



    return (
        <>
            <Butterflies />
            <Box
                sx={(theme) => ({
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '80px 24px 80px', md: '80px 24px 80px' },
                    position: 'relative',
                    overflow: 'hidden',


                    // ✅ Background image properties
                    //backgroundImage: `url('/images/bg-image.webp')`,
                    backgroundImage: `url('/images/section2.webp')`,
                    backgroundSize: 'cover',        // Cover the entire Box
                    backgroundPosition: 'center',   // Center the image
                    backgroundRepeat: 'no-repeat',  // Avoid repeating


                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.6)"
                                : "rgba(0,0,0,0.0)",
                        transition: "0.3s ease",
                    },
                })}
            >


                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
                        {/* Left Content */}
                        <Grid item xs={12} md={6}>


                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '36px', sm: '48px', md: '64px' },
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    marginBottom: 3,
                                    letterSpacing: '-1.5px',
                                    color: '#13343B',
                                }}
                            >
                                <AnimatedText text="Building" delay={0} />{' '}
                                <Box
                                    component="span"
                                    sx={{
                                        background: 'linear-gradient(135deg, #21808D 0%, #13343B 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        backgroundSize: '200% 200%',
                                        animation: 'gradientShift 4s ease infinite',
                                        '@keyframes gradientShift': {
                                            '0%, 100%': { backgroundPosition: '0% 50%' },
                                            '50%': { backgroundPosition: '100% 50%' },
                                        },
                                    }}
                                >
                                    <AnimatedText text="Digital" delay={0.3} />
                                </Box>
                                <br />
                                <AnimatedText text="Experiences" delay={0.6} />
                            </Typography>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: '16px', md: '18px' },
                                        color: '#626C71',
                                        lineHeight: 1.7,
                                        marginBottom: 4,
                                        maxWidth: '520px',
                                    }}
                                >
                                    Frontend Developer specializing in React,Next.js, Material-UI, and 3D web animations.
                                    Creating beautiful, performant, and user-centered digital solutions.
                                </Typography>
                            </motion.div>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Button
                                        component={Link}
                                        to="/projects"

                                        variant="contained"
                                        sx={{
                                            padding: '14px 32px',
                                            borderRadius: '12px',
                                            fontWeight: 600,
                                            fontSize: '15px',
                                            textTransform: 'none',
                                            background: '#21808D',
                                            '&:hover': {
                                                background: '#1D7480',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 16px rgba(33, 128, 141, 0.2)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        View My Work
                                    </Button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            padding: '14px 32px',
                                            borderRadius: '12px',
                                            fontWeight: 600,
                                            fontSize: '15px',
                                            textTransform: 'none',
                                            background: '#FCFCF9',
                                            color: '#13343B',
                                            border: '1px solid rgba(94, 82, 64, 0.2)',
                                            '&:hover': {
                                                background: '#F5F5F5',
                                                border: '1px solid rgba(94, 82, 64, 0.2)',
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Get in Touch
                                    </Button>
                                </motion.div>
                            </Box>
                            <ChatCard open={open} onClose={() => setOpen(false)} />

                            <Fab
                                color="primary"
                                sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
                                onClick={() => setOpen(true)}
                            >
                                <ChatIcon />
                            </Fab>
                        </Grid>

                        {/* Right Content - Browser Frame */}
                        <Grid item xs={12} md={6}>


                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, z: -50 }}
                                animate={{ opacity: 1, scale: 1, z: 0 }}
                                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                style={{ perspective: 1500 }}
                            >
                                <BrowserFrame>
                                    <Box
                                        sx={{
                                            width: { xs: '100%', md: '450px' },  // ← Change width here
                                            height: { xs: 300, md: 380 },
                                            background: 'linear-gradient(135deg, rgba(33, 128, 141, 0.1) 0%, rgba(19, 52, 59, 0.05) 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#626C71',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {/* Floating elements */}
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    y: [0, -20, 0],
                                                    rotate: [0, 10, 0],
                                                }}
                                                transition={{
                                                    duration: 6 + i,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                    delay: i,
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    width: 40,
                                                    height: 40,
                                                    background: '#21808D',
                                                    borderRadius: '8px',
                                                    opacity: 0.1,
                                                    top: i === 0 ? '20%' : i === 1 ? '60%' : 'auto',
                                                    bottom: i === 2 ? '20%' : 'auto',
                                                    left: i === 0 ? '15%' : i === 2 ? '25%' : 'auto',
                                                    right: i === 1 ? '20%' : 'auto',
                                                }}
                                            />
                                        ))}
                                        <span>
                                            <img
                                                src="/images/profile2.webp"
                                                alt="Hero Placeholder"
                                                width={300}
                                                height={360}
                                            />
                                        </span>
                                    </Box>
                                </BrowserFrame>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Map />
        </>
    );
};

export default HomePage;
