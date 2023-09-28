import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mainBrown: 'rgb(97 67 38)',
      },
      fontFamily: {
        banner: ['var(--font-belwe)', 'Georgia', 'Times', '"Times New Roman"', 'serif'],
      },
      screens: {
        '961': '961px',
        '2xl': '1600px',
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
      },
    },
  },
  plugins: [],
};
export default config;
