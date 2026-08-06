/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          dark: "#0B192C",
          blue: "#1E3E62",
          gold: "#D4AF37",
          lightGold: "#FFD700",
          card: "#1E293B"
        }
      }
    },
  },
  plugins: [],
}
