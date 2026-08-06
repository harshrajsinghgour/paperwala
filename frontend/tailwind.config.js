/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#0A1F44',  // मुख्य गहरा नीला बैकग्राउंड
        'card-blue': '#1E3A8A',   // कार्ड्स और नेविगेशन हेडर
        'royal-gold': '#D4AF37',  // मुख्य गोल्ड टेक्स्ट, बॉर्डर और CTA बटन्स
        'btn-blue': '#3B82F6',    // एक्शन बटन्स
      },
    },
  },
  plugins: [],
}
