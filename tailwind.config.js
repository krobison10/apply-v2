// https://mui.com/material-ui/integrations/interoperability/#tailwind-css
/** @type {import('tailwindcss').Config} */

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        'primary': '#1D2D44',
        'primary-dark': '#141f2f',
        'primary-light': '#4a5769',
        'secondary': '#DCBF85',
        'secondary-dark': '#9a855d',
        'secondary-light': '#e3cb9d',
        'success': '#656839',
        'warning': '#eb7534',
        'error': '#D23A3A',
        'background': '#fcfaf9',
        'paper': '#FAFAFA',
        'white': '#FEFEFE',
        'text-primary': '#1C1C1C',
        'text-secondary': '#242424',
        'text-disabled': '#A9A9A9',
      },
    },
  },
  plugins: [],
};
