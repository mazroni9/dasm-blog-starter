/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"   // 📌 عشان المقالات المكتوبة بملفات md
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),  // 📌 إضافة البلجن typography
  ],
};
