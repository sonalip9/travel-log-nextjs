import { borderRadii, spacing } from './src/styles';
import * as colors from './src/styles/palette';

const { nextui } = require('@nextui-org/react');

const { lightColors, darkColors, ...allColors } = colors;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: borderRadii,
      spacing,
      fontFamily: {
        sans: 'var(--nunito)',
        courgette: 'var(--courgette)',
        nunito: 'var(--nunito)',
      },
    },
    colors: {
      transparent: 'transparent',
      ...allColors,
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: { colors: lightColors },
        dark: { colors: darkColors },
      },
    }),
  ],
};
