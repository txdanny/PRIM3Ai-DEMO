/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0A',
          secondary: '#141414',
          tertiary: '#1A1A1A'
        },
        foreground: {
          DEFAULT: '#FFFFFF',
          secondary: '#A1A1AA',
          tertiary: '#52525B'
        },
        accent: {
          blue: '#3B82F6',
          green: '#22C55E',
          red: '#EF4444'
        }
      }
    },
  },
  plugins: [],
};
