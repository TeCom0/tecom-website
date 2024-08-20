/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '550': '550px'
      },
      width: {
        '680': '680px',
        'display':'300px'
      },
      colors:{
        'clearBlue':'#00bfff'
      },
      fontFamily: {
        'quickSand': ["QuickSand", "sans-serif"],
        'roboto': ["roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}

