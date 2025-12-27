import React, { useState } from 'react';
import { THEMES } from './constants/themes';
import { DIFFICULTIES } from './constants/difficulties';
import usePersistedScore from './hooks/usePersistedScore';
import useGameLogic from './hooks/useGameLogic';
import MainMenu from './components/screens/MainMenu';
import VictoryModal from './components/screens/VictoryModal';
import GameBoard from './components/game/GameBoard';
import Confetti from './components/ui/Confetti';

export default function App() {
    // --------------------------------------------------------------------------
    // STATE MANAGEMENT
    // --------------------------------------------------------------------------

    // Configuration State
    const [theme, setTheme] = useState('space');
    const [difficulty, setDifficulty] = useState('medium');
    const [gameMode, setGameMode] = useState('standard');

    // Derived config
    const currentTheme = THEMES[theme];
    const currentDiff = DIFFICULTIES[difficulty];

    // Hooks
    const { highScores, saveScore } = usePersistedScore();

    // We pass saveScore as a callback to useGameLogic to be called when game is won
    const {
        status, setStatus,
        cards,
        flipped,
        matched,
        moves,
        time,
        peekUsed,
        startGame,
        handleCardClick,
        activatePeek
    } = useGameLogic(
        currentTheme,
        currentDiff,
        gameMode,
        (score) => saveScore(difficulty, gameMode, score)
    );

    // --------------------------------------------------------------------------
    // RENDER
    // --------------------------------------------------------------------------

    return (
        <>
            {/* Font Loader & Animations */}
            {/* We include this here so it's available globally */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');
                .font-game { font-family: 'Fredoka', sans-serif; }
            `}</style>

            {status === 'won' && <Confetti />}

            {status === 'menu' ? (
                <MainMenu
                    theme={theme}
                    setTheme={setTheme}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    gameMode={gameMode}
                    setGameMode={setGameMode}
                    highScores={highScores}
                    onStart={startGame}
                />
            ) : (
                <GameBoard
                    currentTheme={currentTheme}
                    currentDiff={currentDiff}
                    gameMode={gameMode}
                    moves={moves}
                    time={time}
                    highScores={highScores}
                    difficulty={difficulty}
                    cards={cards} // Pass down cards from hook
                    flipped={flipped}
                    matched={matched}
                    peekUsed={peekUsed}
                    onPeek={activatePeek}
                    onMenu={() => setStatus('menu')}
                    onCardClick={handleCardClick}
                />
            )}

            {/* Victory Modal Overlay */}
            {(status === 'won' || status === 'lost') && (
                <VictoryModal
                    status={status}
                    moves={moves}
                    time={time}
                    gameMode={gameMode}
                    currentTheme={currentTheme}
                    onMenu={() => setStatus('menu')}
                    onRestart={startGame}
                />
            )}
        </>
    );
}
