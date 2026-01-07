import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "theme(colors.emerald[200])",
          DEFAULT: "theme(colors.emerald[500])",
          dark: "theme(colors.emerald[800])",
        },
        foreground: {
          light: "var(--foreground-light)",
          DEFAULT: "var(--foreground-default)",
          dark: "var(--foreground-dark)",
        },
        background: {
          light: "var(--background-light)",
          DEFAULT: "var(--background-default)",
          dark: "var(--background-dark)",
        },
        disabled: {
          light: "var(--color-neutral-400)",
          DEFAULT: "var(--color-neutral-500)",
          dark: "var(--color-neutral-600)",
        },
        link: {
          light: "theme(colors.sky[300])",
          DEFAULT: "theme(colors.sky[500])",
          dark: "theme(colors.sky[700])",
        },
        success: {
          light: "theme(colors.green[300])",
          DEFAULT: "theme(colors.green[500])",
          dark: "theme(colors.green[700])",
        },
        error: {
          light: "theme(colors.red[300])",
          DEFAULT: "theme(colors.red[500])",
          dark: "theme(colors.red[700])",
        },
        warning: {
          light: "theme(colors.orange[300])",
          DEFAULT: "theme(colors.orange[500])",
          dark: "theme(colors.orange[700])",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
