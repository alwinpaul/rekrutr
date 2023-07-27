/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        'tecnita-blue': "#3EAAE4",
        'tecnita-red': "#ed4635",
        'tecnita-green': "#49a99e",
        'tecnita-yellow': "#fbd233",
      }
    },
  },
  plugins: [],
}

