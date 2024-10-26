/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          white: '#ffffff',
        },
        secondary: {
          lime: '#e6ff00',
          dark: '#11190c',
          gray: '#444638',
          olive: '#787664',
          light: '#cac4b7',
          beige: '#f31ee'
        }
      },
      fontFamily: {
        moonwalk: ['Moon Walk', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
};