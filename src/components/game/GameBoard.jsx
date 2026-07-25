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
    // The control bar is capped to the board's own desktop width so their edges
    // line up. Keep this in sync with MAX_WIDTH in CardGrid.
    const barWidth = currentDiff.cols === 8 ? 'lg:max-w-6xl' : 'lg:max-w-4xl';

    // Centered on desktop, where the board always fits. On mobile the taller decks
    // exceed the viewport, so the column starts at the top and scrolls normally
    // instead of centering and clipping its own top edge.
    return (
        <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-500 flex flex-col lg:justify-center p-4 lg:p-8 font-game`}>
            {/* Control bar stacked above the board, both centered on screen */}
            <div className="w-full mx-auto flex flex-col gap-3 lg:gap-4 items-center justify-center">
                <div className={`w-full max-w-sm ${barWidth}`}>
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
                </div>
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
