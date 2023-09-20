import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mainBrown: 'rgb(97 67 38)',
      },
    },
    screens: {
      '2xl': '1600px',
    },
    fontSize: {
      xl: ['20px', '1'],
    },
    fontFamily: {
      banner: ['Belwe-Bold', 'Georgia', 'Times', '"Times New Roman"', 'serif'],
    },
  },
  plugins: [],
};
export default config;
