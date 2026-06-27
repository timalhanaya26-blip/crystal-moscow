import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdbff",
          300: "#8ec5ff",
          400: "#59a4ff",
          500: "#2f7fff",
          600: "#1a5fef",
          700: "#1549cf",
          800: "#173ea6",
          900: "#193a83",
        },
        gold: {
          400: "#e9c46a",
          500: "#d4a93f",
          600: "#b8902b",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(16, 42, 89, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
