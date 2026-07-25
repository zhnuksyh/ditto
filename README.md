# Ditto! Memory Matching Game

A beautiful, thematic memory matching game built with React, Vite, and Tailwind CSS. Test your memory across different worlds with unique visual styles and vocabularies.

## 🔄 Project Status
<!-- START_SECTION:status -->

| 📅 Last Updated | 🏷️ Version | 🔨 Latest Commit |
| :--- | :--- | :--- |
| Sat, 25 Jul 2026 06:26:16 GMT | v0.1.0 | [`1de2ca0`](https://github.com/zhnuksyh/ditto/commit/1de2ca0) - fix(layout): center the game board on screen

The board sat high and slightly left: the outer wrapper used items-start
with pt-4/lg:pt-12, and the sidebar's lg:sticky lg:top-8 anchored it 2rem
from the viewport top, which fought vertical centering.

Centers both axes on desktop and drops the now-unnecessary sticky
positioning. Mobile still stacks sidebar above board. |

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
- **Easy**: 12 cards (6 pairs) - 45s timer
- **Medium**: 18 cards (9 pairs) - 70s timer
- **Hard**: 24 cards (12 pairs) - 90s timer

### 💾 Progress Tracking
- Tracks your best score (lowest moves) for each difficulty level.
- Local storage persistence ensures your records are saved.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

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
