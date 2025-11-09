import { useState, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const BrowserFrame = ({ children }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
                perspective: 1500,
                transformStyle: 'preserve-3d',
            }}
        >
            <Box
                sx={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    transform: 'rotateY(-8deg) rotateX(4deg)',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                        transform: 'rotateY(-2deg) rotateX(2deg)',
                    },
                }}
            >
                {/* Browser Header */}
                <Box
                    sx={{
                        background: 'linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%)',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#28CA42' }} />
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            background: 'white',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            color: '#626C71',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                        }}
                    >
                        https://yourportfolio.com
                    </Box>
                </Box>

                {/* Browser Content */}
                {children}
            </Box>
        </motion.div>
    );
};

export default BrowserFrame;
