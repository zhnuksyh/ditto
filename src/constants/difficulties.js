// `cols` is the desktop column count. All difficulties share 6 columns so card
// size stays identical between them and only the row count grows.
// Mobile always falls back to 3 columns (see CardGrid).
export const DIFFICULTIES = {
    easy: { label: "Easy", pairs: 6, cols: 6, timeLimit: 45 },     // 6x2 grid (12 cards)
    medium: { label: "Medium", pairs: 9, cols: 6, timeLimit: 70 }, // 6x3 grid (18 cards)
    hard: { label: "Hard", pairs: 12, cols: 6, timeLimit: 90 },    // 6x4 grid (24 cards)
};
