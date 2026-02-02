import React, { useRef, useState, useEffect } from 'react';

interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(168, 85, 247, 0.2)" // Default primary purple
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden group ${className}`}
        >
            {/* Spotlight Gradient Layer */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {/* Border glow layer (optional, reuses same gradient but masked to border) */}

            <div className="relative h-full">{children}</div>
        </div>
    );
};
