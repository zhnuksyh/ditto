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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <Card className="w-full max-w-md p-8 flex flex-col items-center text-center space-y-6 bg-white animate-in zoom-in-95 shadow-2xl">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${status === 'won' ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-500'}`}>
                    {status === 'won' ? <Trophy className="w-12 h-12" /> : <Ghost className="w-12 h-12" />}
                </div>

                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-slate-900">
                        {status === 'won'
                            ? (currentTheme.vocabulary ? currentTheme.vocabulary.victory : 'VICTORY!')
                            : (currentTheme.vocabulary ? currentTheme.vocabulary.defeat : 'GAME OVER')}
                    </h2>
                    <p className="text-slate-500 text-lg font-medium">
                        {status === 'won'
                            ? `You cleared the board in ${gameMode === 'standard' ? `${moves} ${currentTheme.vocabulary ? currentTheme.vocabulary.moves.toLowerCase() : 'moves'}` : `time!`}`
                            : "Time ran out! Better luck next time."}
                    </p>
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
