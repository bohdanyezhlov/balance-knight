import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      min: '320px',
      xs: '480px',
      sm: '720px',
      md: '960px',
      'md+': '961px',
      lg: '1200px',
      xl: '1400px',
      xxl: '1600px',
      max: '2600px',
    },
    fontFamily: {
      serif: ['var(--font-belwe)', 'Georgia', 'Times', '"Times New Roman"', 'serif'],
      sansSerif: ['var(--font-opensans)', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        mainBrown: 'rgb(97 67 38)',
        lightBrown: 'rgb(143 110 110)',
        darkBrown: 'rgb(71 44 17)',
        gold: 'rgb(252 209 68)',
        lightGold: 'rgb(255 229 172)',
      },
      listStyleType: {
        square: 'square',
      },
      fontSize: {
        xl: ['20px', '1'],
      },
      flexGrow: {
        2: '2',
      },
      backgroundImage: {
        'baseLayer-middle': 'url("../public/bgMiddleTile.png")',
        'baseLayer-left': 'url("../public/bgLeftTile.png")',
        'baseLayer-right': 'url("../public/bgRightTile.png")',
        //
        'topLayer-middle': 'url("../public/dropdownMiddleStretch.png")',
        'topLayer-left': 'url("../public/dropdownLeft.png")',
        'topLayer-right': 'url("../public/dropdownRight.png")',
        //
        'topLayer-middle-hover': 'url("../public/dropdownMiddleStretchHoverSelected.png")',
        'topLayer-left-hover': 'url("../public/dropdownLeftHoverSelected.png")',
        'topLayer-right-hover': 'url("../public/dropdownRightHoverSelected.png")',
        //
        'topLayer-middle-search': 'url("../public/searchMiddleStretch.png")',
        'topLayer-left-search': 'url("../public/searchLeft.png")',
        'topLayer-right-search': 'url("../public/searchRight.png")',
        //
        'topLayer-middle-hover-search': 'url("../public/searchMiddleStretchHoverSelected.png")',
        'topLayer-left-hover-search': 'url("../public/searchLeftHoverSelected.png")',
        'topLayer-right-hover-search': 'url("../public/searchRightHoverSelected.png")',
        //
        'topLayer-left-icon': 'url("../public/dropdownWithIconLeft.png")',
        'topLayer-left-icon-hover': 'url("../public/dropdownWithIconLeftHoverSelected.png")',
      },
    },
  },
  plugins: [],
};
export default config;
