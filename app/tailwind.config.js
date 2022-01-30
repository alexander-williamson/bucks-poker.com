const colors = require("tailwindcss/colors");

// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.yellow,
      amber: colors.amber,
      slate: colors.slate,
      zinc: colors.zinc,
    },
    fontFamily: {
      sans: ["Libre Franklin", "sans-serif"],
    },
  },
};
