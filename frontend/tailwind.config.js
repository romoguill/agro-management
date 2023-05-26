/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ADB5',
          50: '#6EF9FF',
          100: '#59F8FF',
          200: '#30F6FF',
          300: '#08F4FF',
          400: '#00D4DE',
          500: '#00ADB5',
          600: '#00777D',
          700: '#004245',
          800: '#000C0D',
          900: '#000000',
          950: '#000000',
        },
      },
    },
  },
  plugins: [],
};
