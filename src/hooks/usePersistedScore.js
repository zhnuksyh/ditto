import { useState, useEffect } from 'react';

const usePersistedScore = () => {
    const [highScores, setHighScores] = useState({});

    // On Mount: Load scores from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('memory-game-scores');
        if (saved) setHighScores(JSON.parse(saved));
    }, []);

    const saveScore = (difficulty, gameMode, score) => {
        const key = `${difficulty}-${gameMode}`;
        const best = highScores[key];

        let isNewRecord = false;
        // Lower moves is better in Standard; Higher time remaining is better in Time Attack
        if (gameMode === 'time-attack') {
            if (!best || score > best) isNewRecord = true;
        } else {
            if (!best || score < best) isNewRecord = true;
        }

        if (isNewRecord) {
            const newScores = { ...highScores, [key]: score };
            setHighScores(newScores);
            localStorage.setItem('memory-game-scores', JSON.stringify(newScores));
        }
    };

    return { highScores, saveScore };
};

export default usePersistedScore;
