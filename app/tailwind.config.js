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
      amber: colors.amber,
      black: colors.black,
      gray: colors.neutral,
      green: colors.green,
      indigo: colors.indigo,
      red: colors.rose,
      slate: colors.slate,
      white: colors.white,
      yellow: colors.yellow,
      zinc: colors.zinc
    },
    fontFamily: {
      sans: ["Libre Franklin", "sans-serif"],
    },
  },
};
