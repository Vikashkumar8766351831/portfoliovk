/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        soft: '0 25px 80px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}

