import { useEffect } from "react";
import Lottie from "lottie-react";
import { motion, useAnimation } from "framer-motion";
import butterfly1 from "../../assets/json/butterly1.json";
import butterfly2 from "../../assets/json/butterfly2.json";
import butterfly3 from "../../assets/json/butterfly3.json";
import "./Butterflies.css";

const RandomButterfly = ({ animationData, startX, startY, duration = 8 }) => {
    const controls = useAnimation();

    // gentle idle movement
    useEffect(() => {
        controls.start({
            x: [0, 40, -40, 0],
            y: [0, 20, -20, 0],
            rotate: [0, 10, -10, 0],
            transition: { duration, repeat: Infinity, ease: "easeInOut" },
        });
    }, [controls, duration]);

    const handleClick = async () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const margin = 0.1; // 10% safe area
        const randomX = (Math.random() * (1 - 2 * margin) + margin) * vw;
        const randomY = (Math.random() * (1 - 2 * margin) + margin) * vh;

        await controls.start({
            x: randomX - startX,
            y: randomY - startY,
            rotate: (Math.random() - 0.5) * 360,
            transition: { duration: 2, ease: "easeInOut" },
        });

        controls.start({
            x: [randomX - startX, randomX - startX + 30, randomX - startX - 30, randomX - startX],
            y: [randomY - startY, randomY - startY + 20, randomY - startY - 20, randomY - startY],
            rotate: [0, 10, -10, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        });
    };

    return (
        <motion.div
            className="scroll-butterfly"
            style={{ left: startX, top: startY }}
            animate={controls}
            onClick={handleClick}
            whileHover={{ scale: 1.1, cursor: "pointer" }}
        >
            <Lottie animationData={animationData} className="butterfly" loop />
        </motion.div>
    );
};

const Butterflies = () => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
    const vh = typeof window !== "undefined" ? window.innerHeight : 1080;

    return (
        <div className="butterfly-container">
            <RandomButterfly animationData={butterfly1} startX={vw * 0.2} startY={vh * 0.4} />
            <RandomButterfly animationData={butterfly2} startX={vw * 0.5} startY={vh * 0.3} duration={10} />
            <RandomButterfly animationData={butterfly3} startX={vw * 0.8} startY={vh * 0.6} duration={12} />
        </div>
    );
};

export default Butterflies;
