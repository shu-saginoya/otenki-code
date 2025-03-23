import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a7f3d0", // emerald-200
          DEFAULT: "#10b981", // emerald-500
          dark: "#065f46", // emerald-800
        },
        foreground: {
          light: "#404040", // neutral-700
          DEFAULT: "#262626", // neutral-800
          dark: "#171717", // neutral-900
        },
        background: {
          light: "#ffffff", // white
          DEFAULT: "#f4f4f5", // neutral-100
          dark: "#e4e4e7", // neutral-200
        },
        disabled: {
          light: "#a3a3a3", // neutral-400
          DEFAULT: "#737373", // neutral-500
          dark: "#525252", // neutral-600
        },
        overlay: {
          light: "rgba(255, 255, 255, 0.25)", // white/25
          DEFAULT: "rgba(255, 255, 255, 0.5)", // white/50
          dark: "rgba(255, 255, 255, 0.75)", // white/75
        },
        link: {
          light: "#7dd3fc", // sky-300
          DEFAULT: "#0ea5e9", // sky-500
          dark: "#0369a1", // sky-700
        },
        success: {
          light: "#86efac", // green-300
          DEFAULT: "#22c55e", // green-500
          dark: "#15803d", // green-700
        },
        error: {
          light: "#fca5a5", // red-300
          DEFAULT: "#ef4444", // red-500
          dark: "#b91c1c", // red-700
        },
        warning: {
          light: "#fdba74", // orange-300
          DEFAULT: "#f97316", // orange-500
          dark: "#c2410c", // orange-700
        },
      },
      spacing: {
        section: "3rem",
        container: "1rem",
        element: "0.5rem",
        inline: "0.125rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
