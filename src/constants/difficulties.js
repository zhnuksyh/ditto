// `cols` is the desktop column count. Easy through Hard share 6 columns so card
// size stays identical between them and only the row count grows.
// Expert widens to 8 columns rather than adding a 5th row: at 1280x800 five rows
// would not fit the height, whereas 8x4 keeps the same row count as Hard.
// Mobile always falls back to 3 columns (see CardGrid).
export const DIFFICULTIES = {
    easy: { label: "Easy", pairs: 6, cols: 6, timeLimit: 45 },      // 6x2 grid (12 cards)
    medium: { label: "Medium", pairs: 9, cols: 6, timeLimit: 70 },  // 6x3 grid (18 cards)
    hard: { label: "Hard", pairs: 12, cols: 6, timeLimit: 90 },     // 6x4 grid (24 cards)
    expert: { label: "Expert", pairs: 16, cols: 8, timeLimit: 120 }, // 8x4 grid (32 cards)
};
