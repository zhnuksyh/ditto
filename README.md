# Ditto! Memory Matching Game

A beautiful, thematic memory matching game built with React, Vite, and Tailwind CSS. Test your memory across different worlds with unique visual styles and vocabularies.

## 🔄 Project Status
<!-- START_SECTION:status -->

| 📅 Last Updated | 🏷️ Version | 🔨 Latest Commit |
| :--- | :--- | :--- |
| Sun, 26 Jul 2026 18:06:25 GMT | v0.1.0 | [`09b1a34`](https://github.com/zhnuksyh/ditto/commit/09b1a34) - feat(icon): replace app icon with a green Lucide copy mark |

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
Challenge yourself with increasing complexity:
- **Easy**: 18 cards (9 pairs) - 6×3 grid - 70s timer
- **Medium**: 24 cards (12 pairs) - 6×4 grid - 90s timer
- **Hard**: 32 cards (16 pairs) - 8×4 grid - 120s timer
- **Expert**: 40 cards (20 pairs) - 10×4 grid - 150s timer

Every level caps at four rows and grows by widening instead, so the board always
fits shorter laptop screens without scrolling. Mobile drops to a 3-column layout
at every difficulty.

Matching cards always share a color — color is never a red herring.

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
