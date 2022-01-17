module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-olive': '#243c5a',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
