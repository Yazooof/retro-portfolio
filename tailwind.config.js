/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'retro': ['VT323', 'monospace'],
      },
      colors: {
        'snes': {
          purple: '#4e4a87',
          'purple-dark': '#2d2a4e',
          'purple-light': '#6b67a8',
          gray: '#b0b0b0',
          'dark-gray': '#3d3d3d',
          red: '#e60012',
          blue: '#0058a8',
          green: '#00a651',
          yellow: '#ffd700',
        },
        'bg': {
          dark: '#1a1a2e',
          card: '#252542',
        }
      }
    },
  },
  plugins: [],
}
