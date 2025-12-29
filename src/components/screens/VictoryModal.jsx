import React from 'react';
import { Trophy, Ghost } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const VictoryModal = ({
    status,
    moves,
    time,
    gameMode,
    currentTheme,
    onMenu,
    onRestart
}) => {
    if (status !== 'won' && status !== 'lost') return null;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <Card className="w-full max-w-md p-8 flex flex-col items-center text-center space-y-6 bg-white animate-in zoom-in-95 shadow-2xl">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${status === 'won' ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-500'}`}>
                    {status === 'won' ? <Trophy className="w-12 h-12" /> : <Ghost className="w-12 h-12" />}
                </div>

                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">
                        {status === 'won'
                            ? (currentTheme.vocabulary ? currentTheme.vocabulary.victory : 'VICTORY!')
                            : (currentTheme.vocabulary ? currentTheme.vocabulary.defeat : 'GAME OVER')}
                    </h2>
                    {status === 'won' ? (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <div className="flex w-full max-w-[240px] border-b border-slate-100 pb-2 mb-2">
                                <div className="flex-1 text-left text-sm font-bold text-slate-400 uppercase tracking-wider">
                                    Metric
                                </div>
                                <div className="flex-1 text-right text-sm font-bold text-slate-400 uppercase tracking-wider">
                                    Result
                                </div>
                            </div>

                            {gameMode === 'standard' && (
                                <div className="flex w-full max-w-[240px] items-center justify-between">
                                    <div className="text-slate-500 font-medium">Moves</div>
                                    <div className="text-2xl font-bold text-slate-800">{moves}</div>
                                </div>
                            )}

                            <div className="flex w-full max-w-[240px] items-center justify-between">
                                <div className="text-slate-500 font-medium">{gameMode === 'time-attack' ? 'Time Left' : 'Time'}</div>
                                <div className="text-2xl font-bold text-slate-800">{formatTime(time)}</div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-lg font-medium">
                            Time ran out! Better luck next time.
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full pt-4">
                    <Button onClick={onMenu} className="py-4 bg-slate-100 text-slate-700 hover:bg-slate-200">
                        Menu
                    </Button>
                    <Button onClick={onRestart} className={`py-4 ${currentTheme.button}`}>
                        Play Again
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default VictoryModal;
