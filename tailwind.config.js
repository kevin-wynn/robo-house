/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        sans: ["articulat-cf", "Helvetica", "Arial", "sans-serif"],
        heavy: ["articulat-heavy-cf", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        black: "#030209",
        slate: "#586F8C",
        bluack: "#10131e",
        granite: "#495B73",
        grey: "#A6A6A6",
        stone: "#F2F2F2",
      },
      borderWidth: {
        1: "1px",
      },
      minHeight: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
