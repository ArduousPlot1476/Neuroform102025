import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#9333ea',
          dark: '#7c3aed',
          light: '#a855f7',
        },
        secondary: {
          DEFAULT: '#ec4899',
          dark: '#db2777',
          light: '#f472b6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
