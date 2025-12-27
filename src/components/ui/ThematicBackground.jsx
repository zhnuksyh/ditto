import React, { useEffect, useState } from 'react';

const ThematicBackground = ({ currentTheme }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate valid background particles based on the theme
        const iconCount = 20;
        const newParticles = Array.from({ length: iconCount }).map((_, i) => {
            const RandomIcon = currentTheme.icons[Math.floor(Math.random() * currentTheme.icons.length)];
            return {
                id: i,
                Icon: RandomIcon,
                left: Math.random() * 100, // 0-100%
                delay: Math.random() * 5,  // 0-5s delay
                duration: Math.random() * 5 + 5, // 5-10s duration
                size: Math.random() * 20 + 20, // 20-40px
                opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
            };
        });
        setParticles(newParticles);
    }, [currentTheme]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={`absolute ${currentTheme.animation === 'float' ? 'animate-float' :
                            currentTheme.animation === 'fall' ? 'animate-fall' :
                                'animate-matrix'
                        }`}
                    style={{
                        left: `${p.left}%`,
                        top: currentTheme.animation === 'float' ? `${Math.random() * 80 + 10}%` : '-50px',
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        color: currentTheme.colors ? 'currentColor' : undefined // Use currentColor if needed or theme text color
                    }}
                >
                    {/* We use the theme accent color for the icons */}
                    <p.Icon
                        className={currentTheme.accent}
                        style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            opacity: p.opacity
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ThematicBackground;
