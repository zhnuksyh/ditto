import React from 'react';

const Confetti = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Generates 50 particles with random colors and animation delays */}
            {[...Array(50)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-fall"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-20px`,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                        animationDelay: `${Math.random() * 2}s`,
                        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)],
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%'
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;
