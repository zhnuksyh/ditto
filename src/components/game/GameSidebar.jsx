import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Lock, ArrowLeft, Timer, RotateCw, Trophy } from 'lucide-react';

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

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const isTimeAttack = gameMode === 'time-attack';

    // Icons carry the meaning here, so each pill also gets screen-reader text.
    const liveLabel = isTimeAttack
        ? 'Time remaining'
        : (currentTheme.vocabulary ? currentTheme.vocabulary.moves : 'Moves');

    const bestValue = (() => {
        const score = highScores[`${difficulty}-${gameMode}`];
        if (!score && score !== 0) return '-';
        if (typeof score === 'number') {
            return isTimeAttack ? formatTime(score) : `${score}`;
        }
        if (typeof score === 'object') {
            return isTimeAttack ? formatTime(score.time) : score.moves;
        }
        return '-';
    })();

    const pill = 'flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-slate-900/5 backdrop-blur-sm';
    const pillValue = 'text-sm lg:text-base font-bold leading-none tabular-nums';

    return (
        <div className="w-full flex items-center gap-3">
            {/* Menu pinned left */}
            <button
                onClick={onMenu}
                className="shrink-0 flex items-center gap-2 rounded-full bg-white/80 pl-3 pr-4 py-2 text-slate-700 shadow-sm ring-1 ring-slate-900/5 backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold">Menu</span>
            </button>

            {/* Stats + Peek grouped right */}
            <div className="flex-1 flex items-center justify-end gap-2">
                {/* Live counter: moves, or remaining time in time-attack */}
                <div className={pill}>
                    {isTimeAttack
                        ? <Timer className="w-4 h-4 text-slate-400" />
                        : <RotateCw className="w-4 h-4 text-slate-400" />}
                    <div className="relative inline-flex items-baseline">
                        <span className={`${pillValue} ${isTimeAttack && time < 10 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>
                            {isTimeAttack ? formatTime(time) : moves}
                        </span>
                        <AnimatePresence>
                            {showBonus && isTimeAttack && (
                                <motion.div
                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, x: 16, y: -12, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="absolute left-full ml-1 font-bold text-green-500 text-xs whitespace-nowrap drop-shadow-sm pointer-events-none"
                                >
                                    +5s
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span className="sr-only">{liveLabel}</span>
                </div>

                {/* Elapsed time alongside moves in standard mode */}
                {!isTimeAttack && (
                    <div className={pill}>
                        <Timer className="w-4 h-4 text-slate-400" />
                        <span className={`${pillValue} text-slate-900`}>{formatTime(time)}</span>
                        <span className="sr-only">Elapsed</span>
                    </div>
                )}

                <div className={pill}>
                    <Trophy className="w-4 h-4 text-slate-400" />
                    <span className={`${pillValue} text-slate-900`}>{bestValue}</span>
                    <span className="sr-only">Best</span>
                </div>

                <button
                    onClick={onPeek}
                    disabled={peekUsed}
                    title={peekUsed ? 'Peek used' : 'Peek board'}
                    className={`shrink-0 grid place-items-center w-10 h-10 rounded-full shadow-sm ring-1 ring-slate-900/5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${peekUsed ? 'cursor-not-allowed bg-white/60 text-slate-300' : 'bg-amber-400 text-amber-950 hover:bg-amber-500'}`}
                >
                    {peekUsed ? <Lock className="w-4 h-4" /> : <Eye className="w-5 h-5" />}
                    <span className="sr-only">{peekUsed ? 'Peek used' : 'Peek board'}</span>
                </button>
            </div>
        </div>
    );
};

export default GameSidebar;
