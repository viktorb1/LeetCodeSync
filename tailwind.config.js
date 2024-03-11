/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      'leetcode': {
        green: "#499f4b",
        orange: '#fa8c1d',
        red: "#e72764",
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },

}