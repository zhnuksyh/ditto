import React from 'react';
import { Gamepad2 } from 'lucide-react';

const CardGrid = ({ cards, flipped, matched, currentTheme, currentDiff, onCardClick }) => {
    // Dynamic max-width to keep card sizes consistent across difficulties
    // Hard (6 cols) -> max-w-4xl (56rem / 6 ≈ 9.33rem per col)
    // Medium (4 cols) -> max-w-xl (36rem / 4 = 9rem per col) - Closest match
    // Easy (3 cols) -> max-w-md (28rem / 3 ≈ 9.33rem per col) - Exact match
    const maxWidthClass = currentDiff.cols === 6 ? 'max-w-4xl' :
        currentDiff.cols === 4 ? 'max-w-xl' : 'max-w-md';

    return (
        <div className="flex-1 w-full flex justify-center">
            <div
                className={`grid gap-4 w-full ${maxWidthClass} mx-auto perspective-1000`}
                style={{ gridTemplateColumns: `repeat(${currentDiff.cols}, minmax(0, 1fr))` }}
            >
                {cards.map((card) => {
                    const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
                    const isMatched = matched.includes(card.id);

                    return (
                        <div
                            key={card.id}
                            onClick={() => onCardClick(card.id)}
                            className={`
                                aspect-square relative cursor-pointer
                                transition-all duration-500 transform
                                ${isMatched ? 'scale-95 opacity-60' : 'hover:scale-[1.02] hover:shadow-xl hover:z-10'}
                            `}
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
                                    backface-hidden border-b-[6px] transition-colors
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
                                    bg-white border-slate-100
                                    backface-hidden
                                `}
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                <card.Icon className={`w-3/5 h-3/5 ${card.color} drop-shadow-sm`} />
                                {isMatched && <div className="absolute inset-0 bg-green-500/10 rounded-2xl animate-pulse" />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardGrid;
