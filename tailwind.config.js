/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        dune: "url('/bkg.jpg')",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        serif: ["condor", "Cambria", "Times New Roman", "Times", "serif"],
      },
      colors: {
        sand: "#e2ddd6",
        spice: "#e7c78d",
        black: "#0c0a03",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
