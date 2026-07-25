// `cols` is the desktop column count. Mobile always falls back to 3 columns
// (see CardGrid).
//
// Every level caps at 4 rows and grows by widening instead, because at 1280x800
// only ~668px of height is usable: four rows of 136px tiles plus gaps needs
// ~592px and fits, while five rows needs ~744px and would overflow.
export const DIFFICULTIES = {
    easy: { label: "Easy", pairs: 9, cols: 6, timeLimit: 70 },       // 6x3 grid (18 cards)
    medium: { label: "Medium", pairs: 12, cols: 6, timeLimit: 90 },  // 6x4 grid (24 cards)
    hard: { label: "Hard", pairs: 16, cols: 8, timeLimit: 120 },     // 8x4 grid (32 cards)
    expert: { label: "Expert", pairs: 20, cols: 10, timeLimit: 150 }, // 10x4 grid (40 cards)
};
