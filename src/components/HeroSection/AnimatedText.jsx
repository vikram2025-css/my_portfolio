import { motion } from 'framer-motion';

const AnimatedText = ({ text, delay = 0 }) => {
    const chars = text.split('');

    return (
        <span style={{ display: 'inline-block' }}>
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: delay + (index * 0.05),
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

export default AnimatedText;
