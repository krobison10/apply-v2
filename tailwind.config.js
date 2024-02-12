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
        'primary': '#2D6A80',
        'primary-dark': '#1f4a59',
        'primary-light': '#578799',
        'secondary': '#802d6a',
        'secondary-dark': '#591f4a',
        'secondary-light': '#995787',
        'success': '#b9f030',
        'warning': '#E67A3E',
        'white': '#FEFEFE',
        'lightgrey': '#F5F3F3',
        'blacktext': '#1C1C1C',
      },
    },
  },
  plugins: [],
};
