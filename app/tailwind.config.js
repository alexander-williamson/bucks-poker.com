const colors = require("tailwindcss/colors");

// tailwind.config.js
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], // remove unused styles in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: colors.black,
    //   white: colors.white,
    //   gray: colors.trueGray,
    //   indigo: colors.indigo,
    //   red: colors.rose,
    //   yellow: colors.amber,
    // }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
