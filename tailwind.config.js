/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        blue:{
            600: '#5046E4',
            400: "#372FA1",
            200:"#E0E7FF",
        },
        slate:{
          400:"#FFFFFF",
          500:"#FAFBFE"
        },
        purple:{
          600:"#504BB4"
        }
      }
    },
  },
  plugins: [],
}