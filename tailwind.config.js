export const content = [
  './src/**/*.{html,js,jsx,ts,tsx}',
  './public/index.html',
];
export const theme = {
  extend: {
    colors: {
      'brand-blue': '#1DA1F2',
      'brand-blue-light': '#EFF9FF',
      'brand-blue-dark': '#2795D9',
      'brand-gray': '#657786',
      'brand-gray-light': '#AAB8C2',
      'brand-gray-dark': '#14171A',
      'brand-gray-darker': '#657786',
      'brand-gray-darkest': '#14171A',
      'brand-green': '#17BF63',
      'brand-green-light': '#E6F4EC',
      'brand-green-dark': '#2795D9',
      'brand-red': '#E0245E',
      'brand-red-light': '#FFE5EC',
      'brand-red-dark': '#2795D9',
      'brand-yellow': '#FFAD1F',
      'brand-yellow-light': '#FFF5E6',
      'brand-yellow-dark': '#2795D9',
      'black': {
        DEFAULT: '#000000',
        'div': '#18191B',
      },
      'blue': {
        DEFAULT: '#1DA1F2',
        'light': '#184872',
        'high': '#182E42',
      },
    },
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      serif: ['Monstserrat', 'sans-serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    container: {
      center: true,
      padding: '1rem',
      margin: 'auto',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1150px',
      },
    },
  },
  };
export const plugins = [];
