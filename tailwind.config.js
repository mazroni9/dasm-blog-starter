/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ecff",
          500: "#1f6feb", // أزرق هادئ
          600: "#1a5dca"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
