import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function generateStars(count: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 1.2;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

const StarField = (props: any) => {
    const ref = useRef<any>();
    // Generate 8000 stars
    const stars = useMemo(() => generateStars(8000), []);

    useFrame((state, delta) => {
        // Much faster rotation
        ref.current.rotation.x -= delta / 5;
        ref.current.rotation.y -= delta / 8;

        // Gentle wave effect
        ref.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.05;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={stars} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#a855f7"
                    size={0.012} // 2.5x larger
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

const Hero3D: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
            </Canvas>
        </div>
    );
};

export default Hero3D;
