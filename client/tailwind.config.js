/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        myText: ['Pontano Sans'],
        myTitle: ['Anton'],
        myScript: ['Cedarville Cursive']
      }
    }
  },
  plugins: []
}
