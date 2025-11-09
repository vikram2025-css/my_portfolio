import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function MovingMoonLight() {
    const lightRef = useRef();
    const moonRef = useRef();

    // Track mouse position and move moon and light
    React.useEffect(() => {
        function onMouseMove(e) {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            // Project to scene coordinates
            if (moonRef.current && lightRef.current) {
                moonRef.current.position.x = x * 3; // adjust scale
                moonRef.current.position.y = y * 2;
                lightRef.current.position.x = x * 3;
                lightRef.current.position.y = y * 2;
            }
        }
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <>
            <mesh ref={moonRef} position={[0, 0, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#d4e9ff" emissive="#88aaff" />
            </mesh>
            <pointLight ref={lightRef} intensity={2} distance={4} />
        </>
    );
}

export default function Threejs() {
    return (
        <Canvas
            style={{ height: "100vh", background: "#111" }}
            camera={{ position: [0, 0, 5] }}
        >
            <ambientLight intensity={0.1} />
            <MovingMoonLight />
        </Canvas>
    );
}
