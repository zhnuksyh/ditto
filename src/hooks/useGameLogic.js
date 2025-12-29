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
    const [bonusNotification, setBonusNotification] = useState(null); // Timestamp for visual "+5s" effect

    // Logic: Initialize a new game session
    const startGame = useCallback(() => {
        // 1. Slice the icons needed for current difficulty
        const selectedIcons = currentTheme.icons.slice(0, currentDiff.pairs);

        // 2. Create pairs (doubling the array)
        const deck = [...selectedIcons, ...selectedIcons]
            .sort(() => Math.random() - 0.5) // 3. Shuffle
            .map((icon, index) => {
                // Determine color based on difficulty
                // Easy/Medium: Both cards in a pair share the same color
                // Hard: Every card gets a random color (making it harder to match by color)
                let colorClass;

                if (currentDiff.label === 'Hard') {
                    // Random color for every card instance
                    colorClass = currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)];
                } else {
                    // Consistent color for the pair (based on icon index)
                    // We need to find the index of this icon in the original selectedIcons array to ensure consistency
                    const iconIndex = selectedIcons.indexOf(icon);
                    colorClass = currentTheme.colors[iconIndex % currentTheme.colors.length];
                }

                return {
                    id: index, // Unique ID for React keys and tracking
                    iconId: selectedIcons.indexOf(icon), // ID for matching logic (0-7)
                    Icon: icon, // The Lucide component
                    color: colorClass // Visual style
                };
            });

        // 4. Reset Game State
        setCards(deck);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setPeekUsed(false);
        setBonusNotification(null);

        // 5. Setup Timer based on Mode
        if (gameMode === 'time-attack') {
            // Reduce initial time by 10 seconds as requested
            setTime(Math.max(10, currentDiff.timeLimit - 10));
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

            // Increment moves regardless of outcome
            setMoves(prev => prev + 1);

            // Match Found?
            if (card1.iconId === card2.iconId) {
                // Delay before locking to let user see the match
                const matchTimeout = setTimeout(() => {
                    setMatched(prev => [...prev, first, second]);
                    setFlipped([]); // Reset flipped

                    // Bonus for Time Attack
                    if (gameMode === 'time-attack') {
                        setTime(prev => prev + 5);
                        setBonusNotification(Date.now()); // Trigger animation
                    }
                }, 500);
                return () => clearTimeout(matchTimeout);
            } else {
                // No Match: Delay flip back to allow user to see cards
                // kept in ref or strict state if needed, but here simple timeout works
                // The "Fast Click" logic in handleCardClick handles the cancellation of this
                const timeout = setTimeout(() => setFlipped([]), 1000);
                // We need to store this timeout ID if we want to cancel it explicitly, 
                // but React's cleanup in useEffect only runs on unmount or dep change. 
                // To support "Fast Click", we'll check flipped.length in handleCardClick.
                return () => clearTimeout(timeout);
            }
        }
    }, [flipped, cards, gameMode]);

    // Logic: Win Condition Checker
    useEffect(() => {
        // Check if all cards are matched
        if (status === 'playing' && matched.length > 0 && matched.length === cards.length) {
            setStatus('won');
            // Save score via callback - Passing OBJECT now
            const scoreData = { moves, time };
            if (saveScoreCallback) {
                saveScoreCallback(scoreData);
            }
        }
    }, [matched, cards, status, gameMode, moves, time, saveScoreCallback]);

    // Interaction Handlers
    const handleCardClick = (id) => {
        // Guard clauses: Prevent clicking if game paused, or card already matched/flipped
        if (status !== 'playing' || matched.includes(id) || flipped.includes(id)) return;

        // FAST CLICK LOGIC:
        // If 2 cards are already flipped...
        if (flipped.length === 2) {
            // Check if they are a match BEFORE resetting
            const [first, second] = flipped;
            const card1 = cards.find(c => c.id === first);
            const card2 = cards.find(c => c.id === second);

            // If they match, INSTANTLY resolve to keep flow smooth
            if (card1.iconId === card2.iconId) {
                // 1. Finalize match immediately
                setMatched(prev => [...prev, first, second]);

                // 2. Apply bonuses
                if (gameMode === 'time-attack') {
                    setTime(prev => prev + 5);
                    setBonusNotification(Date.now()); // Trigger animation
                }

                // 3. Flip the NEW card immediately (clearing the old 2 from flipped)
                setFlipped([id]);
                setMoves(prev => prev + 1); // This counts as a new move start
                return;
            }

            // If NOT a match, proceed with the "Fast Click" reset:
            // Clear previous 2, flip new one immediately
            setFlipped([id]);
            setMoves(prev => prev + 1); // This counts as a new move start
            return;
        }

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
        bonusNotification,
        startGame,
        handleCardClick,
        activatePeek
    };
};

export default useGameLogic;
