import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Chip,
    Stack,
    useTheme,
    useMediaQuery,
    IconButton,
} from '@mui/material';
import {
    OpenInNew,
    GitHub,
    ArrowForward,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Hover animation
const slideUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export default function Projects() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();

    const projects = [
        {
            id: 1,
            title: 'Hospital Management System',
            description: 'Comprehensive healthcare platform with appointment scheduling, patient management, and billing features.',
            image: 'https://img.freepik.com/free-photo/management-coaching-business-dealing-mentor-concept_53876-133858.jpg?semt=ais_hybrid&w=740&q=80',
            tags: ['React', 'Material-UI', 'Firebase'],
            liveLink: 'https://vikram-eb0f7.web.app/',

            featured: true,
        },
        {
            id: 2,
            title: 'E-Commerce Dashboard',
            description: 'Modern admin dashboard for managing products, orders, and analytics with real-time updates.',
            image: '/projects/ecommerce-dashboard.jpg',
            tags: ['React', 'MUI', 'Chart.js'],
            liveLink: '/projects',

            featured: false,
        },
        {
            id: 3,
            title: 'Product Manager',
            description: 'Interactive grid table with sorting, filtering, and pagination features and used API for data fetching.',
            image: '/src/assets/images/product.png',
            tags: ['React', 'Material-UI', 'DataGrid'],

            liveLink: '/gridtable',

            featured: true,
        },
        {
            id: 4,
            title: 'Weather Forecast App',
            description: 'Beautiful weather application with 7-day forecasts, location search, and detailed metrics.',
            image: '/src/assets/images/weather.webp',
            tags: ['React', 'Material-UI', 'API'],
            liveLink: '/weather',

            featured: true,
        },
        {
            id: 5,
            title: 'Monthly Expense Tracker',
            description: 'A user-friendly app to track monthly expenses, visualize spending patterns, and set budget goals.',
            image: '/src/assets/images/expense.png',
            tags: ['React', 'Tailwind', 'Firebase'],
            liveLink: 'https://monthlyexpense01.netlify.app/',

            featured: true,
        },
        {
            id: 6,
            title: 'Portfolio Website Builder',
            description: 'Drag-and-drop website builder allowing users to create stunning portfolios without coding.',
            image: '/projects/portfolio-builder.jpg',
            tags: ['React', 'Material-UI', 'Firebase'],
            liveLink: '/projects',

            featured: false,
        },

    ];

    const handleNavigate = (url) => {
        if (url.startsWith('http')) {
            window.open(url, '_blank');
        } else {
            navigate(url);
        }
    };

    return (
        <Box
            id="projects"
            sx={{
                minHeight: '100vh',
                py: { xs: 6, },
                px: { xs: 2, md: 8 },


                // ✅ Background image properties
                //backgroundImage: `url('/images/bg-image.webp')`,
                backgroundImage: `url('/images/hero.webp')`,
                backgroundSize: 'cover',        // Cover the entire Box
                backgroundPosition: 'center',   // Center the image
                backgroundRepeat: 'no-repeat',  // Avoid repeating
            }}
        >

            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>

                <Typography
                    variant={isMobile ? 'h3' : 'h2'}
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 800, mb: 2 }}
                >
                    Featured Projects
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ maxWidth: 700, mx: 'auto' }}
                >
                    Showcasing my recent work in frontend development,
                    from complex web applications to elegant user interfaces
                </Typography>
            </Box>

            {/* Projects Grid - Using Flexbox for 3 per row */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                    maxWidth: 1550,   // restrict overall width
                    mx: 'auto',       // center horizontally
                }}
            >
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        sx={{
                            width: {
                                xs: '100%',
                                sm: 'calc(50% - 16px)',
                                md: 'calc(30% - 24px)',
                            },
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 3,
                            overflow: 'hidden',
                            position: 'relative',
                            opacity: project.featured ? 1 : 0.6,
                            pointerEvents: project.featured ? 'auto' : 'none',

                            // keep hover only for enabled projects
                            '&:hover': project.featured && {
                                transform: 'translateY(-12px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                '& .project-image': {
                                    transform: 'scale(1.1)',
                                },
                                '& .project-overlay': {
                                    opacity: 1,
                                },
                            },
                        }}
                    >

                        {/* Featured Badge */}
                        {project.featured && (
                            <Chip
                                label="Featured"
                                color="primary"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    zIndex: 2,
                                    fontWeight: 700,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                }}
                            />
                        )}

                        {/* Image Section with Fixed Dimensions */}
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                width: '100%',
                                height: 200,  // Fixed height
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={project.image}
                                alt={project.title}
                                className="project-image"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease',
                                    bgcolor: 'grey.200',
                                }}
                            />

                            {/* Gradient Overlay */}
                            <Box
                                className="project-overlay"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                                    opacity: 0,
                                    transition: 'opacity 0.4s ease',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    pb: 2,
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    className="project-actions"
                                >
                                    <IconButton
                                        href={project.liveLink}

                                        size="small"
                                        sx={{
                                            bgcolor: 'white',
                                            color: 'primary.main',
                                            '&:hover': {
                                                bgcolor: 'grey.100',
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    >
                                        <OpenInNew fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        href={project.githubLink}
                                        target="_blank"
                                        size="small"
                                        sx={{
                                            bgcolor: 'white',
                                            color: 'grey.800',
                                            '&:hover': {
                                                bgcolor: 'grey.100',
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    >
                                        <GitHub fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Box>
                        </Box>

                        {/* Content Section */}
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: 'text.primary',
                                    maxHeight: 48,  // Fixed height for 2 lines
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {project.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 2,
                                    lineHeight: 1.6,
                                    height: 54,  // Fixed height for 3 lines
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {project.description}
                            </Typography>

                            {/* Tech Stack Tags */}
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    mt: 'auto',
                                    minHeight: 56,
                                }}
                            >
                                {project.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            bgcolor: 'primary.50',
                                            color: 'primary.main',
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                            height: 26,
                                            '&:hover': {
                                                bgcolor: 'primary.100',
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </CardContent>

                        {/* View More Button */}
                        <CardActions sx={{ p: 2, pt: 0 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                endIcon={<ArrowForward />}
                                onClick={() => handleNavigate(project.liveLink)}
                                disabled={!project.featured}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.2,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    borderWidth: 2,
                                    transition: 'all 0.3s ease',

                                    // ✅ enabled hover
                                    '&:hover': project.featured && {
                                        borderWidth: 2,
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        transform: 'translateX(4px)',
                                    },

                                    // ✅ disabled styling
                                    '&.Mui-disabled': {
                                        borderColor: 'grey.400',
                                        color: 'grey.500',
                                        cursor: 'not-allowed',
                                    },
                                }}
                            >
                                View Project
                            </Button>

                        </CardActions>
                    </Card>
                ))}
            </Box>

            {/* View All Projects Button */}
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    href="/all-projects"
                    sx={{
                        px: 5,
                        py: 1.8,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        borderRadius: 3,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        '&:hover': {
                            boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                            transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    View All Projects
                </Button>
            </Box>

        </Box>
    );
}
