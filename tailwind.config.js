/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {  // Changed from 'color' to 'colors'
        seasalt: "#F8FAFC",
        mediumslateblue: "#726DD1",
        secondary: "#E1E7FE",
        primary: "#4F44E5",
        oxfordblue: "#171B2D",
        battleshipgray: "#888D93",
        blue: {
          600: '#5046E4',
          400: "#372FA1",
          200: "#E0E7FF",
        },
        slate: {
          400: "#FFFFFF",
          500: "#FAFBFE",
        },
        purple: {
          600: "#504BB4",
        },
      },
    },
  },
  plugins: [],
}
