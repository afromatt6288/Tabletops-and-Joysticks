/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
      extend: {
        textColor: {
          'multi': 'transparent',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        backgroundImage: theme => ({
          'multi-gradient': 'linear-gradient(to right, red, yellow, green, blue)',
          'multi-gradient-hover': 'linear-gradient(to right, orange, purple, cyan)',
          'multi-gradient-active': 'linear-gradient(to right, magenta, lime, turquoise)',
        }),
        borderColor: {
          'theme-text': 'var(--color-theme-text)',
          'theme-hover-text': 'var(--color-theme-hover-text)',
        },
      },
  },
  variants: {
    extend: {
      backgroundImage: ['hover', 'active'],
    },
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-multi': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.hover\\:bg-multi-gradient-hover:hover': {
          backgroundImage: 'linear-gradient(to right, orange, purple, cyan)',
        },
        '.active\\:bg-multi-gradient-active:active': {
          backgroundImage: 'linear-gradient(to right, magenta, lime, turquoise)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'active'])
    }
  ],
}