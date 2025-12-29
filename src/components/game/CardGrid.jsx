import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CardGrid = ({ cards, flipped, matched, currentTheme, currentDiff, onCardClick }) => {
    // Dynamic max-width to keep card sizes consistent across difficulties
    // Mobile: Always max-w-md (3 cols)
    // Desktop: Scales with cols
    const maxWidthClass = currentDiff.cols === 6 ? 'lg:max-w-4xl' :
        currentDiff.cols === 4 ? 'lg:max-w-xl' : 'max-w-md';

    // Grid columns:
    // Mobile: Fixed 3 columns (grid-cols-3)
    // Desktop: Dynamic based on difficulty (lg:grid-cols-X)
    const gridColsClass = currentDiff.cols === 6 ? 'lg:grid-cols-6' :
        currentDiff.cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

    return (
        <div className="flex-1 w-full flex justify-center">
            <div
                className={`grid grid-cols-3 ${gridColsClass} gap-4 w-full max-w-md ${maxWidthClass} mx-auto perspective-1000`}
            >
                {cards.map((card) => {
                    const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
                    const isMatched = matched.includes(card.id);

                    return (
                        <motion.div
                            key={card.id}
                            onClick={() => onCardClick(card.id)}
                            animate={isMatched ? {
                                scale: [1, 1.25, 0.9, 1.1, 1],
                                rotate: [0, 10, -10, 5, -5, 0],
                                transition: { duration: 0.6, ease: "easeInOut" }
                            } : {}}
                            transition={{ duration: 0.3 }}
                            className={`
                                aspect-square relative cursor-pointer
                                transition-all duration-300
                                ${isMatched ? 'z-0' : 'hover:scale-[1.02] hover:z-10'}
                            `}
                            style={{
                                perspective: '1000px'
                            }}
                        >
                            <div
                                className={`w-full h-full relative preserve-3d transition-all duration-500`}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                }}
                            >
                                {/* Card Back Face (The Design) */}
                                <div
                                    className={`
                                        absolute inset-0 rounded-2xl shadow-md
                                        flex items-center justify-center
                                        ${currentTheme.cardBack}
                                        backface-hidden border-b-[6px]
                                    `}
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    <div className="opacity-20 transform rotate-45">
                                        <Gamepad2 className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Card Front Face (The Icon) */}
                                <div
                                    className={`
                                        absolute inset-0 rounded-2xl shadow-xl border-2
                                        flex items-center justify-center
                                        bg-white
                                        backface-hidden
                                        ${isMatched ? (currentTheme.matchClass || 'ring-4 ring-green-400') : 'border-slate-100'}
                                    `}
                                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    <card.Icon className={`w-3/5 h-3/5 ${card.color} drop-shadow-sm`} />
                                    {isMatched && <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse" />}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardGrid;
