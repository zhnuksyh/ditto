import { useState, useEffect, useCallback } from 'react';

const useGameLogic = (currentTheme, currentDiff, gameMode, saveScoreCallback) => {
    // Gameplay State
    const [status, setStatus] = useState('menu'); // Lifecycle: 'menu' -> 'playing' -> 'won' | 'lost'
    const [cards, setCards] = useState([]);       // Array of card objects { id, iconId, Icon, color }
    const [flipped, setFlipped] = useState([]);   // Array of IDs currently face up (max 2)
    const [matched, setMatched] = useState([]);   // Array of IDs permanently matched
    const [moves, setMoves] = useState(0);        // Move counter
    const [time, setTime] = useState(0);          // Timer (seconds)
    const [peekUsed, setPeekUsed] = useState(false); // Power-up tracking

    // Logic: Initialize a new game session
    const startGame = useCallback(() => {
        // 1. Slice the icons needed for current difficulty
        const selectedIcons = currentTheme.icons.slice(0, currentDiff.pairs);

        // 2. Create pairs (doubling the array)
        const deck = [...selectedIcons, ...selectedIcons]
            .sort(() => Math.random() - 0.5) // 3. Shuffle
            .map((icon, index) => ({
                id: index, // Unique ID for React keys and tracking
                iconId: selectedIcons.indexOf(icon), // ID for matching logic (0-7)
                Icon: icon, // The Lucide component
                color: currentTheme.colors[index % currentTheme.colors.length] // Visual variety
            }));

        // 4. Reset Game State
        setCards(deck);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setPeekUsed(false);

        // 5. Setup Timer based on Mode
        if (gameMode === 'time-attack') {
            setTime(currentDiff.timeLimit);
        } else {
            setTime(0);
        }

        setStatus('playing');
    }, [currentTheme, currentDiff, gameMode]);

    // Logic: Game Timer
    useEffect(() => {
        let timer;
        if (status === 'playing') {
            timer = setInterval(() => {
                setTime(prev => {
                    if (gameMode === 'time-attack') {
                        // Loss condition for Time Attack
                        if (prev <= 1) {
                            setStatus('lost');
                            return 0;
                        }
                        return prev - 1;
                    }
                    // Standard mode counts up
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [status, gameMode]);

    // Logic: Card Matching Engine
    useEffect(() => {
        // Only run if exactly two cards are flipped
        if (flipped.length === 2) {
            const [first, second] = flipped;
            const card1 = cards.find(c => c.id === first);
            const card2 = cards.find(c => c.id === second);

            // Match Found?
            if (card1.iconId === card2.iconId) {
                setMatched(prev => [...prev, first, second]);
                setFlipped([]); // Reset flipped immediately for flow

                // Bonus for Time Attack
                if (gameMode === 'time-attack') {
                    setTime(prev => prev + 5);
                }
            } else {
                // No Match: Delay flip back to allow user to see cards
                const timeout = setTimeout(() => setFlipped([]), 1000);
                return () => clearTimeout(timeout);
            }

            // Increment moves regardless of outcome
            setMoves(prev => prev + 1);
        }
    }, [flipped, cards, gameMode]);

    // Logic: Win Condition Checker
    useEffect(() => {
        // Check if all cards are matched
        if (status === 'playing' && matched.length > 0 && matched.length === cards.length) {
            setStatus('won');
            // Save score via callback
            const currentScore = gameMode === 'time-attack' ? time : moves;
            if (saveScoreCallback) {
                saveScoreCallback(currentScore);
            }
        }
    }, [matched, cards, status, gameMode, moves, time, saveScoreCallback]);

    // Interaction Handlers
    const handleCardClick = (id) => {
        // Guard clauses: Prevent clicking if game paused, already 2 flipped, card already flipped/matched
        if (status !== 'playing' || flipped.length >= 2 || flipped.includes(id) || matched.includes(id)) return;
        setFlipped(prev => [...prev, id]);
    };

    const activatePeek = () => {
        if (peekUsed || status !== 'playing') return;
        setPeekUsed(true);

        // Logic: Identify all cards not yet matched
        const unmatchedIds = cards.filter(c => !matched.includes(c.id)).map(c => c.id);
        const originalFlipped = [...flipped];

        // "Cheat": Reveal them all
        setFlipped(unmatchedIds);

        // Hide them after 1.5s
        setTimeout(() => {
            setFlipped(originalFlipped); // Restore previous state
        }, 1500);
    };

    return {
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
    };
};

export default useGameLogic;
