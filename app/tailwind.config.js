/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./src/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        keyframes: {
          rock: {
            '0%, 100%': { transform: 'rotate(-5deg)' },  // start and end tilting left :contentReference[oaicite:0]{index=0}
            '50%':      { transform: 'rotate(5deg)' },   // midpoint tilts right :contentReference[oaicite:1]{index=1}
          },
        },
        animation: {
          rock: 'rock 3s ease-in-out infinite',         // 3s per cycle, smooth back-and-forth :contentReference[oaicite:2]{index=2}
        },
      },
    },
    plugins: [],
  }