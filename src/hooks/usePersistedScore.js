import { useState, useEffect } from 'react';

const usePersistedScore = () => {
    const [highScores, setHighScores] = useState({});

    // On Mount: Load scores from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('memory-game-scores');
        if (saved) setHighScores(JSON.parse(saved));
    }, []);

    const saveScore = (difficulty, gameMode, scoreData) => {
        const key = `${difficulty}-${gameMode}`;
        const best = highScores[key]; // best can be number (legacy) or object {moves, time}

        // Normalizing current score data to object if it isn't already (backwards compatibility)
        // Note: scoreData coming from useGameLogic will now be { moves, time }
        const currentMoves = scoreData.moves;
        const currentTime = scoreData.time;

        let isNewRecord = false;

        if (gameMode === 'time-attack') {
            // Time Attack: Higher Time Remaining is better
            // Legacy support: if best is just a number, treat it as time
            const bestTime = typeof best === 'object' ? best.time : best;

            if (!best || currentTime > bestTime) {
                isNewRecord = true;
            }
        } else {
            // Standard: Lower Moves is better. Tie-breaker: Lower Time is better.
            const bestMoves = typeof best === 'object' ? best.moves : best;
            const bestTime = typeof best === 'object' ? best.time : 999999; // Default high time for legacy

            if (!best) {
                isNewRecord = true;
            } else if (currentMoves < bestMoves) {
                isNewRecord = true;
            } else if (currentMoves === bestMoves && currentTime < bestTime) {
                isNewRecord = true;
            }
        }

        if (isNewRecord) {
            // Store as object
            const newScoreValue = { moves: currentMoves, time: currentTime };
            const newScores = { ...highScores, [key]: newScoreValue };
            setHighScores(newScores);
            localStorage.setItem('memory-game-scores', JSON.stringify(newScores));
        }
    };

    return { highScores, saveScore };
};

export default usePersistedScore;
