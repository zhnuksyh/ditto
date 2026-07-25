# Ditto! Memory Matching Game

A beautiful, thematic memory matching game built with React, Vite, and Tailwind CSS. Test your memory across different worlds with unique visual styles and vocabularies.

## 🔄 Project Status
<!-- START_SECTION:status -->

| 📅 Last Updated | 🏷️ Version | 🔨 Latest Commit |
| :--- | :--- | :--- |
| Sat, 25 Jul 2026 06:58:30 GMT | v0.1.0 | [`cae79bc`](https://github.com/zhnuksyh/ditto/commit/cae79bc) - fix(ci): keep readme status table to one line |

<!-- END_SECTION:status -->

## 🎮 Play Now

[**Live Demo**](https://zhnuksyh.github.io/ditto/)

## ✨ Features

### 🎨 Immersive Themes
Choose your atmosphere. Each theme comes with unique colors, icons, background animations, and vocabulary:
- **Cosmic**: Drift through space with floating elements. Moves are "Warps".
- **Forest**: Relax in nature with falling leaves. Moves are "Steps".
- **Christmas**: Festive holiday spirit with gentle snowfall. Moves are "Wishes".

### 🏆 Difficulty Levels
Challenge yourself with increasing complexity. Every level uses the same card
size — only the number of rows grows:
- **Easy**: 12 cards (6 pairs) - 6×2 grid - 45s timer
- **Medium**: 18 cards (9 pairs) - 6×3 grid - 70s timer
- **Hard**: 24 cards (12 pairs) - 6×4 grid - 90s timer

On **Hard**, every card is assigned a random color so you can't match by color
alone. Mobile drops to a 3-column layout at every difficulty.

### 🎯 Game Modes
- **Standard**: The move counter climbs. Fewest moves wins, with elapsed time as
  the tie-breaker.
- **Time Attack**: The clock counts down and each match adds 5 seconds. Most time
  remaining wins.

### 🔍 Peek
One free reveal of the whole board per game — use it wisely.

### 💾 Progress Tracking
- Tracks a personal best per difficulty **and** game mode.
- Local storage persistence ensures your records are saved.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Offline**: installable PWA via [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

## 🚀 Getting Started

### Prerequisites
- Node.js installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zhnuksyh/ditto.git
   cd ditto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
