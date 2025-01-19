import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        primaryDark: "#065f46",
        primaryLight: "#a7f3d0",
        secondary: "#0ea5e9",
        secondaryDark: "#075985",
        secondaryLight: "#bae6fd",
        background: "#e4e4e7",
        backgroundDark: "#171717",
        backgroundLight: "#fafafa",
        success: "#22c55e",
        successDark: "#166534",
        successLight: "#bbf7d0",
        error: "#ef4444",
        errorDark: "#991b1b",
        errorLight: "#fecaca",
        warning: "#f97316",
        warningDark: "#9a3412",
        warningLight: "#fed7aa",
        disabled: "#6b7280",
        disabledDark: "#1f2937",
        disabledLight: "#e5e7eb",
      },
    },
  },
  plugins: [],
} satisfies Config;
