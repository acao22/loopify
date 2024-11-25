// frontend/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'gabarito': ['Gabarito', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-to-b-custom': 'linear-gradient(to bottom, #8FCE5D, #FEC6C6)',
      },
      colors: {
        lightGreen: '#8FCE5D',
        lightPink: '#FEC6C6',
      },
    },
  },
  plugins: [],
}
