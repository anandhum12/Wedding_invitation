/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF6EC',
        cream: '#F4EAD5',
        parchment: '#EDE0C2',
        ink: '#3A2A1E',
        gold: {
          DEFAULT: '#B08D3C',
          light: '#D9B964',
          pale: '#EBD9A6',
          dark: '#85661F',
          deep: '#6B5017',
        },
        maroon: {
          DEFAULT: '#7A1F24',
          deep: '#4A0E12',
          night: '#2A070A',
        },
        forest: {
          DEFAULT: '#1F3A2B',
          deep: '#11241A',
        },
      },
      fontFamily: {
        script: ['"Pinyon Script"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        card: '0 30px 80px -30px rgba(74, 14, 18, 0.35), 0 10px 30px -15px rgba(107, 80, 23, 0.25)',
        glow: '0 0 40px -6px rgba(217, 185, 100, 0.55)',
      },
    },
  },
  plugins: [],
};
