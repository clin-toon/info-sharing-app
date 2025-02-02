/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BFBFBF", // Customize the primary color
        secondary: "#0D0D0D", // Customize the secondary color
        accent: {
          light: "#F3E8FF", // Light variant
          DEFAULT: "#D946EF", // Default accent color
          dark: "#A21CAF", // Dark variant
        },
        customGray: "#6B7280", // Additional custom color
      },
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui"], // Sets Roboto as the default sans font
      },
    },
  },
  plugins: [],
};
