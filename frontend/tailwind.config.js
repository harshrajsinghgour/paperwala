/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        cardBg: '#1E293B',
        accentGold: '#D4AF37',
        accentGoldDark: '#B89628',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        borderDark: '#334155'
      },
    },
  },
  plugins: [],
}
