/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        borderColor: {
          'theme-text': 'var(--color-theme-text)',
          'theme-hover-text': 'var(--color-theme-hover-text)',
        },
      },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")]
  }