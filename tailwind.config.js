/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        leaves: "url('/background.jpg')",
      },
      colors: {
        black: "#101010",
        "davys-grey": "#595959",
        "grey-web": "#7F7F7F",
        quicksilver: "#A5A5A5",
        "light-grey": "#CCCCCC",
        cultured: "#F2F2F2",
        blood: "#990100",
      }
    },
  },
  plugins: [],
};
