export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // make sure jsx is included!
  ],
  theme: {
    extend: {},
  },
  plugins: {
    "@tailwindcss/postcss": {},
  }
}