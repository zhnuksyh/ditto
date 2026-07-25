import React from 'react';
import CardGrid from './CardGrid';
import GameSidebar from './GameSidebar';

const GameBoard = ({
    currentTheme,
    currentDiff,
    gameMode,
    moves,
    time,
    highScores,
    difficulty,
    cards,
    flipped,
    matched,
    peekUsed,
    onPeek,
    onMenu,
    onCardClick,
    bonusNotification
}) => {
    return (
        <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-500 flex flex-col justify-center p-4 lg:p-8 font-game`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');
                .font-game { font-family: 'Fredoka', sans-serif; }
            `}</style>

            <style>{`
                @keyframes fall {
                0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                .animate-fall { animation-name: fall; animation-timing-function: linear; animation-fill-mode: forwards; }
            `}</style>

            {/* Main Container - centered both axes on desktop */}
            <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center">
                <GameSidebar
                    currentTheme={currentTheme}
                    gameMode={gameMode}
                    moves={moves}
                    time={time}
                    highScores={highScores}
                    difficulty={difficulty}
                    peekUsed={peekUsed}
                    onPeek={onPeek}
                    onMenu={onMenu}
                    bonusNotification={bonusNotification}
                />
                <CardGrid
                    cards={cards}
                    flipped={flipped}
                    matched={matched}
                    currentTheme={currentTheme}
                    currentDiff={currentDiff}
                    onCardClick={onCardClick}
                />
            </div>
        </div>
    );
};

export default GameBoard;
