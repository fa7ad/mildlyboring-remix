const colors = require('tailwindcss/colors')

function renderColors({ addBase, theme }) {
  function extractColorVars(colorObj, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey]

      const newVars =
        typeof value === 'string'
          ? { [`--color${colorGroup}-${colorKey}`]: value }
          : extractColorVars(value, `-${colorKey}`)

      return { ...vars, ...newVars }
    }, {})
  }

  addBase({
    ':root': extractColorVars(theme('colors'))
  })
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.fuchsia,
        neutral: colors.gray
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      typography: ['dark'],
      text: ['dark']
    }
  },
  plugins: [require('@tailwindcss/typography'), renderColors]
}
