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
        'primary': '#3f51b5',
        'primary-dark': '#2c387e',
        'primary-light': '#6573c3',
        'secondary': '#ffc400',
        'secondary-dark': '#b28900',
        'secondary-light': '#ffcf33',
        'success': '#52a348',
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
