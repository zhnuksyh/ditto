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
            <Card className="bg-white/90 backdrop-blur-md p-6 flex flex-col gap-6 shadow-xl border-white/20">

                {/* Sidebar Header */}
                <div className="flex items-center justify-between lg:justify-start lg:gap-3 border-b border-slate-100 pb-4 lg:pb-6">
                    <div className={`p-2 rounded-lg ${currentTheme.bg} ${currentTheme.accent}`}>
                        <Gamepad2 className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h2 className="font-bold text-2xl text-slate-900 leading-none tracking-tight">Ditto!</h2>
                    </div>
                </div>

                {/* Stats Panel */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                    {/* Live Counter */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            {gameMode === 'time-attack' ? 'Time Left' : (currentTheme.vocabulary ? currentTheme.vocabulary.moves : 'Moves')}
                        </span>
                        <div className={`text-3xl font-medium ${gameMode === 'time-attack' && time < 10 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>
                            {gameMode === 'time-attack' ? formatTime(time) : moves}
                        </div>
                    </div>

                    {/* Best Score */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Best
                        </span>
                        <div className="text-3xl font-medium text-slate-900">
                            {highScores[`${difficulty}-${gameMode}`] || '-'}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                    <Button
                        onClick={onPeek}
                        disabled={peekUsed} // Note: Parent should handle status check or pass status, but simple disable here works if Logic handles it too. Logic handles it.
                        className={`w-full py-6 text-base ${peekUsed ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-amber-400 hover:bg-amber-500 text-amber-950'} border-0 shadow-md`}
                    >
                        {peekUsed ? <Lock className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                        {peekUsed ? 'Peek Used' : 'Peek Board'}
                    </Button>

                    <Button onClick={onMenu} variant="outline" className="w-full py-4 bg-transparent border-2 border-slate-200 hover:bg-slate-50 text-slate-600">
                        <ChevronRight className="w-4 h-4 rotate-180 mr-2" /> Menu
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
