/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#495CEF",
        yellow: "#FFC328",
        "gray-dark": "#8D8D8D",
        "gray-med": "#D9D9D9",
        "gray-light": "#F3F3F3",
        'custom-gray': '#f2f1f1',
        'custom-blue': '#007bff', // Example blue color
        'custom-red': '#ff4757', // Example red color
        primary: '#007bff', // Replace with your preferred primary color
        secondary: '#6c757d', // Replace with your preferred secondary color
        tertiary: '#fca311', // Replace with your preferred tertiary color
        'primary-dark': '#0056b3', // Darker shade of your primary color
        'secondary-dark': '#545b62',
        'black-border': '#000000',
      },
    },
  },
  plugins: [],
};
