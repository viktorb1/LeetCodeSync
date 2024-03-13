/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["src/**/*.{html,js,ts,jsx,tsx,vue,css}", "web/**/*.{html,js,ts,jsx,tsx,vue,css}"],
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
  }
}