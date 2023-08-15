/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '400px',
      // => @media (min-width: 640px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }
    
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      '2md': '968px',
      // => @media (min-width: 968px) { ... }
    
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      '2lg': '1124px',
      // => @media (min-width: 1124px) { ... }
    
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}


