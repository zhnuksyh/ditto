import {
    Ghost, Heart, Star, Moon, Sun, Cloud, Snowflake, Zap,
    Leaf, Flower, Trees, Mountain, Droplets, Wind,
    Cpu, Disc, Radio, Wifi, Battery, Monitor, Gamepad2
} from 'lucide-react';

export const THEMES = {
    space: {
        name: "Cosmic",
        bg: "bg-indigo-950",
        cardBack: "bg-indigo-800 border-indigo-700",
        accent: "text-indigo-300",
        button: "bg-indigo-500 hover:bg-indigo-600 text-white",
        icons: [Ghost, Moon, Star, Sun, Cloud, Snowflake, Zap, Heart],
        colors: ["text-indigo-300", "text-purple-300", "text-blue-300", "text-sky-300"],
        vocabulary: {
            moves: "Warps",
            victory: "Mission Accomplished",
            defeat: "Signal Lost",
            play: "Launch"
        },
        animation: "float" // Zero gravity float
    },
    nature: {
        name: "Forest",
        bg: "bg-lime-50",
        cardBack: "bg-emerald-600 border-emerald-700",
        accent: "text-emerald-600",
        button: "bg-emerald-500 hover:bg-emerald-600 text-white",
        icons: [Leaf, Flower, Trees, Mountain, Droplets, Wind, Sun, Cloud],
        colors: ["text-emerald-600", "text-green-600", "text-lime-600", "text-teal-600"],
        vocabulary: {
            moves: "Steps",
            victory: "Harmony Restored",
            defeat: "Lost in Woods",
            play: "Explore"
        },
        animation: "fall" // Falling leaves
    },
    cyber: {
        name: "Neon",
        bg: "bg-violet-900",
        cardBack: "bg-fuchsia-800 border-fuchsia-600",
        accent: "text-fuchsia-300",
        button: "bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-[0_0_15px_rgba(192,38,211,0.5)]",
        icons: [Cpu, Disc, Radio, Wifi, Battery, Monitor, Zap, Gamepad2],
        colors: ["text-fuchsia-300", "text-cyan-300", "text-yellow-300", "text-pink-300"],
        vocabulary: {
            moves: "Hacks",
            victory: "System Override",
            defeat: "Connection Severed",
            play: "Jack In"
        },
        animation: "matrix" // Matrix rain
    }
};
