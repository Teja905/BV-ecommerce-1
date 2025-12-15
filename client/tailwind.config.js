/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#232f3e',
          gold: '#febd69',
          accent: '#f3a847'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};

