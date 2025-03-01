import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        extend: 'light',
        colors: {
          background: '#F7F7F7', 
          primary: {
            DEFAULT: '#FFB22C',
            foreground: '#ffffff',
            50: '#FFEBD1',
            100: '#FFD9A8',
            200: '#FFC87E',
            300: '#FFB955',
            400: '#FFA72C',
            500: '#FFB22C',
            600: '#E69F28',
            700: '#CC8C24',
            800: '#B37820',
            900: '#99681C'
          },
          secondary: {
            DEFAULT: '#854836',
            foreground: '#ffffff',
            50: '#F2D6C7',
            100: '#E0B39C',
            200: '#C78F72',
            300: '#A86B4E',
            400: '#944F3C',
            500: '#854836',
            600: '#6D3A2B',
            700: '#552E22',
            800: '#3E2119',
            900: '#29150F'
          },
          default: {
            DEFAULT: '#000000',
            foreground: '#ffffff',
          }
        }
      }
    }
  })],
};

export default config;
