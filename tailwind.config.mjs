/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', "monospace"],
        sans: ['"IBM Plex Sans"', "sans-serif"],
        condensed: ['"Barlow Condensed"', "sans-serif"],
      },
      colors: {
        cream: "#f5f0e8",
        bone: "#e8e0d0",
        ink: "#0a0a0a",
        red: "#e63329",
        muted: "#8a8070",
      },
      letterSpacing: {
        widest: "0.3em",
        ultra: "0.5em",
      },
    },
  },
  plugins: [],
};
