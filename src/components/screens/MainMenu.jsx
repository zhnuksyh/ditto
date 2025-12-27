import React from 'react';
import { Sparkles, Settings, Gamepad2, Timer, ChevronRight } from 'lucide-react';
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

    return (
        <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-500 flex items-center justify-center p-4 font-game relative`}>
            {/* Thematic Background Animation */}
            <ThematicBackground currentTheme={currentTheme} />

            {/* Font handled in App root or here if standalone, but assuming App handles it for consistency. 
                 However, to ensure it works if App doesn't render it when Menu is active (if conditional), 
                 it needs to be present. 
                 In original code it was in both branches. I will assume App handles it or I'll add it here if I decide to not put in App.
                 Safest is to rely on App layout, but if App returns <MainMenu /> efficiently it might not wrap in a div that has the style.
                 I'll add it here just in case or rely on "App" being the container.
             */}

            <Card className="w-full max-w-4xl bg-white p-8 lg:p-12 space-y-8 relative overflow-hidden shadow-2xl z-10">
                <div className={`absolute top-0 left-0 w-full h-2 ${currentTheme.bg.replace('bg-', 'bg-')}-500`} />

                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-6xl font-bold tracking-tight text-slate-900 uppercase">DITTO<span className={currentTheme.accent}>!</span></h1>
                    <p className="text-slate-500 text-lg font-medium">Train your brain, beat the clock.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column: Theme Selector */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Select Theme
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {Object.entries(THEMES).map(([key, t]) => {
                                const ThemeIcon = t.icons[0];
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setTheme(key)}
                                        className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left ${theme === key
                                            ? `border-${t.accent.split('-')[1]}-500 bg-${t.accent.split('-')[1]}-50`
                                            : "border-slate-100 hover:border-slate-200"
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center shrink-0`}>
                                            <ThemeIcon className={`w-6 h-6 ${t.accent}`} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{t.name}</div>
                                            <div className="text-xs text-slate-500 font-medium">Immersive soundscapes & visuals</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Settings */}
                    <div className="space-y-8">
                        {/* Difficulty Toggle */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Settings className="w-4 h-4" /> Difficulty
                            </label>
                            <div className="flex bg-slate-100 p-1.5 rounded-xl">
                                {Object.entries(DIFFICULTIES).map(([key, d]) => (
                                    <button
                                        key={key}
                                        onClick={() => setDifficulty(key)}
                                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${difficulty === key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                            }`}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Game Mode Selector */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Gamepad2 className="w-4 h-4" /> Game Mode
                            </label>
                            <div
                                onClick={() => setGameMode(prev => prev === 'standard' ? 'time-attack' : 'standard')}
                                className="cursor-pointer border-2 border-slate-100 rounded-xl p-4 flex items-center justify-between hover:border-slate-200 hover:bg-slate-50 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${gameMode === 'time-attack' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {gameMode === 'time-attack' ? <Timer className="w-6 h-6" /> : <Gamepad2 className="w-6 h-6" />}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-slate-900 text-lg">{gameMode === 'time-attack' ? 'Time Attack' : 'Standard'}</div>
                                        <div className="text-sm text-slate-500 font-medium">{gameMode === 'time-attack' ? 'Race against the clock!' : 'Relaxed gameplay'}</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        {/* High Score Preview */}
                        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                            <span className="text-sm font-medium text-slate-500">
                                Personal Best ({currentDiff.label}):
                                <span className="text-slate-900 ml-2 font-bold text-lg">
                                    {highScores[`${difficulty}-${gameMode}`] || '-'}
                                </span>
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
