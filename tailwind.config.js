/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kameron: ["Kameron", "serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
