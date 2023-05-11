/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
      extend: {
        minWidth: {
          '40': '40px',
          '160': '160px',
          '170': '170px',
        },
        textColor: {
          'multi': 'transparent',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        backgroundImage: theme => ({
          'multi-gradient-hover': 'linear-gradient(to right, red, yellow, green, blue)',
          'multi-gradient-active': 'linear-gradient(to right, orange, purple, cyan)',
          'multi-gradient': 'linear-gradient(to right, magenta, lime, turquoise)',
          'theme-gradient': 'linear-gradient(to right, var(--color-theme-background-start), var(--color-theme-background-2), var(--color-theme-background-3), var(--color-theme-background-4), var(--color-theme-background-middle), var(--color-theme-background-6), var(--color-theme-background-7), var(--color-theme-background-8), var(--color-theme-background-end))',
          'theme-gradient-hover': 'linear-gradient(to right, var(--color-theme-hover-background-start), var(--color-theme-hover-background-2), var(--color-theme-hover-background-3), var(--color-theme-hover-background-4), var(--color-theme-hover-background-middle), var(--color-theme-hover-background-6), var(--color-theme-hover-background-7), var(--color-theme-hover-background-8), var(--color-theme-hover-background-end))',
          'theme-gradient-active': 'linear-gradient(to right, var(--color-theme-active-background-start), var(--color-theme-active-background-2), var(--color-theme-active-background-3), var(--color-theme-active-background-4), var(--color-theme-active-background-middle), var(--color-theme-active-background-6), var(--color-theme-active-background-7), var(--color-theme-active-background-8), var(--color-theme-active-background-end))',
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