/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2285d0",
        yellow: "#FFC328",
        "gray-dark": "#8D8D8D",
        "gray-med": "#D9D9D9",
        "gray-light": "#F3F3F3",
        'custom-gray': '#f2f1f1',
        'custom-blue': '#2285d0', // Example blue color
        'custom-light-blue': '#e7f5ff', // Example blue color
        'custom-red': '#ff4757', // Example red color
        primary: '#007bff', // Replace with your preferred primary color
        secondary: '#6c757d', // Replace with your preferred secondary color
        tertiary: '#fca311', // Replace with your preferred tertiary color
        'primary-dark': '#0056b3', // Darker shade of your primary color
        'secondary-dark': '#545b62',
        'black-border': '#000000',
        'button-blue': '#2285d0',
        'button-red': '#ff4757',
        'button-green': '#28a745',
        'button-yellow': '#ffc328',
        google: '#DB4437', // Google red
        googleHover: '#C1351D', // A darker red for hover state
        github: '#333', // GitHub's color is usually a shade of black
        githubHover: '#211F1F', // A darker shade for hover state
      },
    },
  },
  plugins: [],
};
