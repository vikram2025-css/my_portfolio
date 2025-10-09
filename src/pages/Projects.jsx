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

// Hover animation
const slideUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export default function Projects() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const projects = [
        {
            id: 1,
            title: 'Hospital Management System',
            description: 'Comprehensive healthcare platform with appointment scheduling, patient management, and billing features.',
            image: 'https://img.freepik.com/free-photo/management-coaching-business-dealing-mentor-concept_53876-133858.jpg?semt=ais_hybrid&w=740&q=80',
            tags: ['React', 'Material-UI', 'Firebase'],
            liveLink: 'https://your-project-link.com',
            githubLink: 'https://github.com/yourusername/project',
            featured: true,
        },
        {
            id: 2,
            title: 'E-Commerce Dashboard',
            description: 'Modern admin dashboard for managing products, orders, and analytics with real-time updates.',
            image: '/projects/ecommerce-dashboard.jpg',
            tags: ['React', 'MUI', 'Chart.js'],
            liveLink: 'https://your-project-link.com',
            githubLink: 'https://github.com/yourusername/project',
            featured: true,
        },
        {
            id: 3,
            title: 'Social Media App',
            description: 'Interactive social platform with posts, comments, likes, and real-time notifications.',
            image: '/projects/social-media.jpg',
            tags: ['React', 'Redux', 'Socket.io'],
            liveLink: 'https://your-project-link.com',
            githubLink: 'https://github.com/yourusername/project',
            featured: false,
        },
        {
            id: 4,
            title: 'Weather Forecast App',
            description: 'Beautiful weather application with 7-day forecasts, location search, and detailed metrics.',
            image: '/projects/weather-app.jpg',
            tags: ['React', 'Material-UI', 'API'],
            liveLink: 'https://your-project-link.com',
            githubLink: 'https://github.com/yourusername/project',
            featured: false,
        },
        {
            id: 5,
            title: 'Task Management Tool',
            description: 'Productivity app with drag-and-drop kanban boards, deadlines, and team collaboration features.',
            image: '/projects/task-manager.jpg',
            tags: ['React', 'DnD Kit', 'TypeScript'],
            liveLink: 'https://your-project-link.com',
            githubLink: 'https://github.com/yourusername/project',
            featured: false,
        },
        {
            id: 6,
            title: 'Portfolio Website Builder',
            description: 'Drag-and-drop website builder allowing users to create stunning portfolios without coding.',
            image: '/projects/portfolio-builder.jpg',
            tags: ['React', 'Material-UI', 'Firebase'],
            liveLink: 'https://your-project-link.com',
            githubLink: 'https://github.com/yourusername/project',
            featured: true,
        },
    ];

    return (
        <Box
            id="projects"
            sx={{
                minHeight: '100vh',
                py: { xs: 6, },
                bgcolor: 'background.default',
            }}
        >

            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Chip
                    label="PORTFOLIO"
                    color="primary"
                    sx={{
                        mb: 2,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        letterSpacing: 1,
                    }}
                />
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
                                xs: '100%',                    // Full width on mobile
                                sm: 'calc(70% - 16px)',        // 2 cards on tablet
                                md: 'calc(33.333% - 56px)',    // 3 cards on desktop
                            },
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 3,
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            '&:hover': {
                                transform: 'translateY(-12px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                '& .project-image': {
                                    transform: 'scale(1.1)',
                                },
                                '& .project-overlay': {
                                    opacity: 1,
                                },
                                '& .project-actions': {
                                    animation: `${slideUp} 0.3s ease-out`,
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
                                height: 300,  // Fixed height
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
                                        target="_blank"
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
                                p: 3,
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
                                    maxHeight: 56,  // Fixed height for 2 lines
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
                                    height: 66,  // Fixed height for 3 lines
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
                        <CardActions sx={{ p: 3, pt: 0 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                endIcon={<ArrowForward />}
                                href={project.liveLink}
                                target="_blank"
                                sx={{
                                    borderRadius: 2,
                                    py: 1.2,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    borderWidth: 2,
                                    '&:hover': {
                                        borderWidth: 2,
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        transform: 'translateX(4px)',
                                    },
                                    transition: 'all 0.3s ease',
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
