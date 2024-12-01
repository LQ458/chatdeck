/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          violet: "var(--color-primary-violet)",
          blue: "var(--color-primary-blue)",
          green: "var(--color-primary-green)",
          rose: "var(--color-primary-rose)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
