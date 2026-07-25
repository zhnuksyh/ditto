import {
    // Shared
    Heart, Star, Moon, Sun, Cloud, Snowflake, Zap, Flame, Music,
    // Cosmic
    Ghost, Rocket, Globe, Radio, Cpu, Orbit, Satellite, Atom, Radar,
    // Forest
    Leaf, Flower, Trees, Mountain, Droplets, Wind, Bird, Fish, Tent, Sunset,
    Squirrel, Rabbit, Clover, Sprout,
    // Christmas
    Gift, Bell, CandyCane, Cookie, PartyPopper, Church, Crown, Cake
} from 'lucide-react';

export const THEMES = {
    space: {
        name: "Cosmic",
        description: "Zero-gravity visual effects",
        type: "dark",
        bg: "bg-indigo-950",
        cardBack: "bg-indigo-800 border-indigo-700",
        outline: "border-indigo-500",
        matchClass: "opacity-50 grayscale contrast-125",
        accent: "text-indigo-300",
        button: "bg-indigo-500 hover:bg-indigo-600 text-white",
        icons: [Ghost, Moon, Star, Sun, Cloud, Snowflake, Zap, Heart, Rocket, Globe, Radio, Cpu, Orbit, Satellite, Atom, Radar],
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
        description: "Peaceful forest atmosphere",
        type: "light",
        bg: "bg-lime-50",
        cardBack: "bg-emerald-600 border-emerald-700",
        outline: "border-emerald-500",
        matchClass: "opacity-60 saturate-50",
        accent: "text-emerald-600",
        button: "bg-emerald-500 hover:bg-emerald-600 text-white",
        icons: [Leaf, Flower, Trees, Mountain, Droplets, Wind, Sun, Cloud, Bird, Fish, Tent, Sunset, Squirrel, Rabbit, Clover, Sprout],
        colors: ["text-emerald-600", "text-green-600", "text-lime-600", "text-teal-600"],
        vocabulary: {
            moves: "Steps",
            victory: "Harmony Restored",
            defeat: "Lost in Woods",
            play: "Explore"
        },
        animation: "fall" // Falling leaves
    },
    christmas: {
        name: "Christmas",
        description: "Festive holiday spirit",
        type: "light",
        isSpecial: true,
        bg: "bg-red-50",
        cardBack: "bg-red-600 border-red-700",
        outline: "border-transparent",
        matchClass: "opacity-75 brightness-110",
        accent: "text-red-600",
        button: "bg-red-600 hover:bg-red-700 text-white shadow-lg",
        icons: [Snowflake, Gift, Bell, Trees, Star, Heart, Moon, Cloud, Music, Flame, CandyCane, Cookie, PartyPopper, Church, Crown, Cake],
        colors: ["text-red-600", "text-green-600", "text-yellow-500", "text-blue-500"],
        vocabulary: {
            moves: "Wishes",
            victory: "Holiday Magic!",
            defeat: "Coal in Stocking",
            play: "Unwrap"
        },
        animation: "snow" // Gentle snowfall
    }
};
