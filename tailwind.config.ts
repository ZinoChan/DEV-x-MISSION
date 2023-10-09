import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#C4F277',
        'primary-2': '#279AF1',
        'secondary-1': '#F277C4',
        'secondary-2': '#FDE45D',
        'secondary-3': '#A577F2',
        'light-1': '#F4F6F0',
        'light-2': '#FDFFFA',
        'light-3': '#fffffe',
        'light-4': '#F9FAF7',
        'gray-1': '#EBEBEB',
        'gray-2': '#D5D5D5',
        'gray-3': '#969696',
        'gray-4': '#6A706E',
        'gray-5': '#CDCDCD',
        'dark-1': '#0E0E0E',
      },
      fontFamily: {
        main: ['var(--font-main)'],
        body: ['var(--font-body)'],
      },
      screens: {
        xs: '340px',
      },
    },
  },
  plugins: [],
};
export default config;
