/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      colors: {
        primary: "#6857E8",
        secondary: "#C2BAFF",
        black: "#2D2D2A",
        dark: "#151718",
        grey: "#a3a2a2",
        tertiary: "#8FD14F",
        gray2: "#E7E9E2",
        smokewhite: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
