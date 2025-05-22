/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' if you prefer OS preference
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
