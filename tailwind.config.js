/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffd6e9",
        accent: "#340a36",
        white: "#fff",
        "text-main": "#22223b",
        "text-muted": "#737373",
        "text-pink": "#6c1f70",
      },
      fontFamily: {
        candy: ["'Emilys Candy'", "cursive"], 
       },
    },
  },
  plugins: [],
};
