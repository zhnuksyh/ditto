import React from 'react';
import { Sparkles, Settings, Gamepad2, Timer, ChevronRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { THEMES } from '../../constants/themes';
import { DIFFICULTIES } from '../../constants/difficulties';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ThematicBackground from '../ui/ThematicBackground';

const MainMenu = ({
    theme, setTheme,
    difficulty, setDifficulty,
    gameMode, setGameMode,
    highScores,
    onStart
}) => {
    const currentTheme = THEMES[theme];
    const currentDiff = DIFFICULTIES[difficulty];
    const isDark = currentTheme.type === 'dark';

    return (
        <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-500 flex items-center justify-center p-4 font-game relative`}>
            {/* Thematic Background Animation */}
            <ThematicBackground currentTheme={currentTheme} />

            <Card className={`w-full max-w-4xl p-8 lg:p-12 space-y-8 relative overflow-hidden shadow-2xl z-10 transition-colors duration-300
                ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-white'}
                backdrop-blur-md
            `}>
                <div className={`absolute top-0 left-0 w-full h-2 ${currentTheme.bg.replace('bg-', 'bg-')}-500`} />

                <div className="text-center space-y-2 mb-8">
                    <h1 className={`text-6xl font-bold tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>DITTO<span className={currentTheme.accent}>!</span></h1>
                    <p className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Train your brain, beat the clock.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column: Theme Selector */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Select Theme
                        </label>

                        {/* Desktop View: Grid */}
                        <div className="hidden lg:grid grid-cols-1 gap-5">
                            {Object.entries(THEMES).map(([key, t]) => {
                                const ThemeIcon = t.icons[0];
                                const isSelected = theme === key;
                                return (
                                    <motion.button
                                        key={key}
                                        onClick={() => setTheme(key)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left relative overflow-hidden group
                                            ${isSelected
                                                ? `${t.outline} ${isDark ? 'bg-slate-800/80' : 'bg-white'}`
                                                : isDark ? "border-slate-700 hover:border-slate-500 bg-slate-800/80" : "border-slate-100 hover:border-slate-200 bg-white"
                                            }
                                            ${t.isSpecial ? "border-transparent" : ""}
                                        `}
                                    >
                                        {/* Special Candy Cane Border Background */}
                                        {t.isSpecial && (
                                            <div className="absolute inset-0 candy-cane-border opacity-20 pointer-events-none" />
                                        )}

                                        {/* Special Border Outline (Pseudo) */}
                                        {t.isSpecial && isSelected && (
                                            <div className="absolute inset-0 border-4 border-amber-400/50 rounded-xl pointer-events-none z-20" />
                                        )}

                                        {/* Special Badge with Animation */}
                                        {t.isSpecial && (
                                            <div className="absolute top-0 right-0 z-30">
                                                <div className="bg-gradient-to-r from-red-500 to-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-md flex items-center gap-1">
                                                    <motion.div
                                                        animate={{ rotate: [0, 20, 0, -20, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                                                    >
                                                        <Gift className="w-3 h-3" />
                                                    </motion.div>
                                                    Special
                                                </div>
                                            </div>
                                        )}

                                        <div className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center shrink-0 z-10 relative shadow-sm`}>
                                            <ThemeIcon className={`w-6 h-6 ${t.accent}`} />
                                        </div>
                                        <div className="z-10 relative flex-1">
                                            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</div>
                                            <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.description}</div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Mobile View: Toggle */}
                        <div className="lg:hidden">
                            <motion.button
                                onClick={() => {
                                    // Cycle: christmas -> nature -> space -> christmas
                                    const nextTheme = theme === 'christmas' ? 'nature' : theme === 'nature' ? 'space' : 'christmas';
                                    setTheme(nextTheme);
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all relative overflow-hidden
                                    ${currentTheme.isSpecial
                                        ? 'border-transparent' // Let candy cane border handle it
                                        : isDark
                                            ? 'border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                                            : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                    }
                                    ${isDark && !currentTheme.isSpecial ? 'bg-slate-800' : ''}
                                `}
                            >
                                {/* Special Mobile Styles */}
                                {currentTheme.isSpecial && (
                                    <>
                                        <div className="absolute inset-0 candy-cane-border opacity-20 pointer-events-none" />
                                        <div className="absolute inset-0 border-4 border-amber-400/50 rounded-xl pointer-events-none z-20" />
                                        <div className="absolute top-0 right-0 z-30">
                                            <div className="bg-gradient-to-r from-red-500 to-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-md flex items-center gap-1">
                                                <Gift className="w-3 h-3" />
                                                Special
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center gap-4 z-10 relative">
                                    <div className={`w-12 h-12 rounded-full ${currentTheme.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                                        {React.createElement(currentTheme.icons[0], { className: `w-6 h-6 ${currentTheme.accent}` })}
                                    </div>
                                    <div className="text-left">
                                        <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentTheme.name}</div>
                                        <div className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{currentTheme.description}</div>
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 z-10 relative ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Column: Settings */}
                    <div className="flex flex-col gap-6 h-full justify-between">
                        {/* Difficulty Toggle */}
                        <div className="space-y-4">
                            <label className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                                <Settings className="w-4 h-4" /> Difficulty
                            </label>
                            <div className={`flex p-1.5 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                {Object.entries(DIFFICULTIES).map(([key, d]) => (
                                    <button
                                        key={key}
                                        onClick={() => setDifficulty(key)}
                                        className={`flex-1 px-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${difficulty === key
                                            ? isDark ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm"
                                            : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"
                                            }`}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Game Mode Selector */}
                        <div className="space-y-4">
                            <label className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                                <Gamepad2 className="w-4 h-4" /> Game Mode
                            </label>
                            <div
                                onClick={() => setGameMode(prev => prev === 'standard' ? 'time-attack' : 'standard')}
                                className={`cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all
                                    ${isDark
                                        ? 'border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${gameMode === 'time-attack' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {gameMode === 'time-attack' ? <Timer className="w-6 h-6" /> : <Gamepad2 className="w-6 h-6" />}
                                    </div>
                                    <div className="text-left">
                                        <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{gameMode === 'time-attack' ? 'Time Attack' : 'Standard'}</div>
                                        <div className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{gameMode === 'time-attack' ? 'Race against the clock!' : 'Relaxed gameplay'}</div>
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                            </div>
                        </div>

                        {/* High Score Preview */}
                        <div className={`mt-auto rounded-xl p-4 text-center border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                            <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Personal Best ({currentDiff.label}):
                                <div className={`ml-2 font-bold inline-block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {(() => {
                                        const score = highScores[`${difficulty}-${gameMode}`];

                                        // Case 1: No score
                                        if (!score && score !== 0) return <span className="text-slate-400 font-normal">-</span>;

                                        // Formatter
                                        const formatT = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

                                        // Case 2: Legacy Score (Number)
                                        if (typeof score === 'number') {
                                            if (gameMode === 'time-attack') return `${formatT(score)} Left`;
                                            return `${score} Moves`;
                                        }

                                        // Case 3: Object Score { moves, time }
                                        if (typeof score === 'object') {
                                            if (gameMode === 'time-attack') {
                                                return `${formatT(score.time)} Left`;
                                            }
                                            // Standard
                                            return (
                                                <div className="flex items-baseline justify-center gap-2">
                                                    <span>{score.moves} Moves</span>
                                                    <span className="font-normal text-slate-500">in</span>
                                                    <span>{formatT(score.time)}</span>
                                                </div>
                                            );
                                        }

                                        return '-';
                                    })()}</div>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button onClick={onStart} className={`w-full py-6 text-xl rounded-xl ${currentTheme.button} shadow-xl hover:shadow-2xl hover:-translate-y-1`}>
                        {currentTheme.vocabulary ? currentTheme.vocabulary.play : 'Start Game'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default MainMenu;
