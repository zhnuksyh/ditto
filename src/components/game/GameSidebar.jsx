import React from 'react';
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
    onMenu
}) => {
    // Helper format function
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 lg:sticky lg:top-8">
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
                            {gameMode === 'time-attack' ? 'Time' : (currentTheme.vocabulary ? currentTheme.vocabulary.moves : 'Moves')}
                        </span>
                        <div className={`text-xl lg:text-3xl font-medium leading-tight ${gameMode === 'time-attack' && time < 10 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>
                            {gameMode === 'time-attack' ? formatTime(time) : moves}
                        </div>
                    </div>

                    {/* Best Score */}
                    <div className="flex-1 bg-slate-50 p-2 lg:p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 lg:mb-1">
                            Best
                        </span>
                        <div className="text-xl lg:text-3xl font-medium leading-tight text-slate-900">
                            {highScores[`${difficulty}-${gameMode}`] || '-'}
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
