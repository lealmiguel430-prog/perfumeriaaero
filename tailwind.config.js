/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37', // Primary gold
          light: '#F2D27A',   // Highlight gold
          dark: '#A8792A',    // Deep gold shadow
          metallic: '#C9992F',
        },
        // Flat definitions for charcoal to avoid generation issues
        charcoal: '#121212', 
        'charcoal-light': '#1A2220',
        'charcoal-dark': '#0B0B0B',
        
        cream: {
          DEFAULT: '#F5E6D3',
          light: '#F9F4E9',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(to right, #F2D27A, #D4AF37, #A8792A)',
        'gradient-dark': 'linear-gradient(to bottom, #1A2220, #0B0B0B)',
      }
    },
  },
  plugins: [],
}