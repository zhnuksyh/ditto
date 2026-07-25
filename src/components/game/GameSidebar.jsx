import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Eye, Lock, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const GameSidebar = ({
    currentTheme,
    gameMode,
    moves,
    time,
    highScores,
    difficulty,
    peekUsed,
    onPeek,
    onMenu,
    bonusNotification
}) => {
    // Bonus Animation State
    const [showBonus, setShowBonus] = useState(false);

    useEffect(() => {
        if (bonusNotification) {
            setShowBonus(true);
            const timer = setTimeout(() => setShowBonus(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [bonusNotification]);

    // Helper format function
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
            <Card className="bg-white/90 backdrop-blur-md p-4 lg:p-6 flex flex-row lg:flex-col items-center lg:items-stretch gap-4 lg:gap-6 shadow-xl border-white/20">

                {/* Sidebar Header - Compact on mobile */}
                <div className="flex items-center gap-3 lg:border-b lg:border-slate-100 lg:pb-6">
                    <div className={`p-1.5 lg:p-2 rounded-lg ${currentTheme.bg} ${currentTheme.accent}`}>
                        <Gamepad2 className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="text-left py-1 lg:py-0">
                        <h2 className="font-bold text-lg lg:text-2xl text-slate-900 leading-none tracking-tight">Ditto!</h2>
                    </div>
                </div>

                {/* Stats Panel - Horizontal row on mobile, Stack on Desktop */}
                <div className="flex-1 flex gap-2 lg:grid lg:grid-cols-1 lg:gap-3">
                    {/* Live Counter */}
                    <div className="flex-1 bg-slate-50 p-2 lg:p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 lg:mb-1">
                            {gameMode === 'time-attack' ? 'Time Remaining' : (currentTheme.vocabulary ? currentTheme.vocabulary.moves : 'Moves')}
                        </span>
                        <div className="relative inline-flex items-center justify-center">
                            <div className={`text-xl lg:text-3xl font-medium leading-tight ${gameMode === 'time-attack' && time < 10 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>
                                {gameMode === 'time-attack' ? formatTime(time) : moves}
                            </div>
                            <AnimatePresence>
                                {showBonus && gameMode === 'time-attack' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, x: 20, y: -10, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="absolute left-full ml-1 font-bold text-green-500 text-sm lg:text-base whitespace-nowrap drop-shadow-sm pointer-events-none"
                                    >
                                        +5s
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* Secondary Stat (Time in Standard) */}
                        {gameMode !== 'time-attack' && (
                            <div className="text-xs text-slate-400 mt-1">
                                {formatTime(time)}
                            </div>
                        )}
                    </div>

                    {/* Best Score */}
                    <div className="flex-1 bg-slate-50 p-2 lg:p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 lg:mb-1">
                            Best
                        </span>
                        <div className="text-xl lg:text-3xl font-medium leading-tight text-slate-900">
                            {(() => {
                                const score = highScores[`${difficulty}-${gameMode}`];
                                if (!score && score !== 0) return '-';

                                // Legacy (Number)
                                if (typeof score === 'number') {
                                    if (gameMode === 'time-attack') return formatTime(score);
                                    return `${score}`; // Just moves
                                }

                                // Object { moves, time }
                                if (typeof score === 'object') {
                                    if (gameMode === 'time-attack') return formatTime(score.time);
                                    // Standard: Show moves (primary for standard)
                                    // If we want to show time too, we might need more space or a tooltip,
                                    // but for this small box, just "Best Moves" is standards-compliant or specifically what fits.
                                    // Let's formatting it like "12 (0:45)" if it fits, or just 12. 
                                    // The design has limited space. Let's try Moves first.
                                    return score.moves;
                                }
                                return '-';
                            })()}
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Compact on mobile */}
                <div className="flex lg:flex-col gap-2 lg:gap-3 lg:pt-2">
                    <Button
                        onClick={onPeek}
                        disabled={peekUsed}
                        className={`p-3 lg:w-full lg:py-6 text-sm lg:text-base ${peekUsed ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-amber-400 hover:bg-amber-500 text-amber-950'} border-0 shadow-md`}
                    >
                        {peekUsed ? <Lock className="w-5 h-5 lg:mr-2" /> : <Eye className="w-5 h-5 lg:mr-2" />}
                        <span className="hidden lg:inline">{peekUsed ? 'Peek Used' : 'Peek Board'}</span>
                    </Button>

                    <Button onClick={onMenu} variant="outline" className="p-3 lg:w-full lg:py-4 bg-transparent border-2 border-slate-200 hover:bg-slate-50 text-slate-600">
                        <ChevronRight className="w-4 h-4 rotate-180 lg:mr-2" />
                        <span className="hidden lg:inline">Menu</span>
                    </Button>
                </div>
            </Card>

            {/* Tips Section (Hidden on Mobile) */}
            <div className="hidden lg:block text-center p-4">
                <p className="text-sm text-white/50 font-medium">
                    Pro Tip: Matching consecutive pairs increases your combo multiplier!
                </p>
            </div>
        </div>
    );
};

export default GameSidebar;
