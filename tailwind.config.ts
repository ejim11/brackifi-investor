import type { Config } from 'tailwindcss';

// primary color is green
// secondary color is gold
// tertiary color is black

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      dmsans: ['var(--font-dmSans'],
      nunito: ['var(--font-nunito)'],
    },
    colors: {
      'color-curentColor': 'currentColor',
      'color-transparent': 'transparent',
      'color-white': '#fff',
      'color-black': 'rgba(0, 0, 0, 1)',
      'color-black-light': 'rgba(0, 0, 0, 0.5)',
      'color-red': 'red',
      'color-primary': {
        1: 'rgba(67, 104, 80)',
        2: '#EEF0E5',
        3: '#d3f9d8',
      },
      'color-secondary': {
        1: 'rgba(210, 183, 116, 1)',
        2: '#555335',
      },
      'color-tertiary': {
        1: '#36454F',
        2: 'rgba(0, 0, 0, 0.8)',
      },
    },
    screens: {
      '3xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }
      '2xl': { max: '1350px' },
      // => @media (max-width: 1535px) { ... }
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
      xlg: { max: '1150px' },
      // => @media (max-width: 1150px) { ... }
      lg: { max: '1024px' },
      // => @media (max-width: 1023px) { ... }
      xmd: { max: '950px' },
      // => @media (max-width: 950px) { ... }
      md: { max: '850px' },
      // => @media (max-width: 850px) { ... }
      smd: { max: '700px' },
      // => @media (max-width: 700px) { ... }
      sm: { max: '500px' },
      // => @media (max-width: 500px) { ... }
      ssm: { max: '300px' },
      // => @media (max-width: 500px) { ... }
    },
    extend: {
      backgroundImage: {
        'home-bg':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .9) 15%,  rgba(0,0,0,1) 100%), url(../assets/home-bg.jpg)',
        'order-bg':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .8) 15%,  rgba(0,0,0,.9) 100%), url(../assets/order.jpg)',
        'home-bg-2':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .8) 15%,  rgba(0,0,0,1) 100%), url(../assets/home-bg.jpg)',
        'phil-bg':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .2) 15%,  rgba(0,0,0,.3) 100%)',
        'about-bg':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .8) 15%,  rgba(0,0,0,1) 100%), url(../assets/about-us.jpg)',
        'insights-bg':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .8) 15%,  rgba(0,0,0,1) 100%), url(../assets/insights.jpg)',
        'charity-bg':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .8) 15%,  rgba(0,0,0,1) 100%), url(../assets/donations.jpg)',
        'invest-app-bg':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .8) 15%,  rgba(0,0,0,1) 100%), url(../assets/investment-approach.jpg)',
        'portfolio-bg': 'url(../assets/contour.svg)',
        'db-bg':
          'linear-gradient(to right bottom,  rgba(255,255,255, .1) 15%,  rgba(0,0,0,.3) 100%),url(../assets/Hexagon.svg)',
        'home-db-bg':
          'linear-gradient(to right,  rgba(67, 104, 80, .95) 15%,  rgba(0,0,0,1) 100%), url(../assets/home-bg.jpg)',
        'home-db':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, 1) 15%,  rgba(0,0,0,1) 100%)',
        'rect-light':
          'linear-gradient(to right bottom,  rgba(67, 104, 80, .2) 15%,  rgba(0,0,0,1) 100%), url(../assets/rect-light.svg)',
      },
      // url(../assets/Hexagon.svg)
    },
  },
  plugins: [],
};
export default config;
