import { createTheme, useTheme } from '@nextui-org/react';
import { BaseTheme } from '@nextui-org/react/types/theme';

import { darkColors, lightColors } from './palette';
import { borderRadii, spacing } from './spacing';

const theme: BaseTheme = {
  colors: lightColors,
  space: spacing,
  radii: borderRadii,
  fonts: {
    display: 'Courgette, sans-serif',
    headline: 'Nunito Sans, sans-serif',
    title: 'Nunito Sans, sans-serif',
    label: 'Nunito Sans, sans-serif',
    body: 'Nunito Sans, sans-serif',
  },
};

export const lightTheme = createTheme({
  className: 'LightTheme',
  type: 'light',
  theme,
});

export const darkTheme = createTheme({
  className: 'DarkTheme',
  type: 'dark',
  theme: {
    ...theme,
    colors: darkColors,
  },
});

export const useAppTheme = useTheme;
