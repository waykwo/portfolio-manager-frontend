/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
        prata: ['Prata', 'Baskerville', 'serif']
      },
    },
  },
  plugins: [],
}