/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          dark: '#a07832',
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
      },
    },
  },
  plugins: [],
};
