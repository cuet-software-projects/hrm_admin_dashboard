module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1600px',
      // => @media (min-width: 1600px) { ... }
    },
    colors: {
      primary: '#F57B1C',

      'secondary-1': '#CB3C23',
      'secondary-2': '#FFF9F5',

      //blacks
      'black-1': '#1B1B1B',

      //greys
      'grey-1': '#6F6B74',

      //whites
      'white-1': '#FFFFFF',

      //brand-grad
      'brand-grad-1': '#F57B1C',
      'brand-grad-2': '#CB3C23',

      //green
      'green-1': '#3DCC89',

      // ##### extra colors
      danger: {
        DEFAULT: '#dc4c64',
        50: '#fef2f2',
        300: '#fca5a5',
      },
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      poppins: ['Poppins'],
    },
  },
};
