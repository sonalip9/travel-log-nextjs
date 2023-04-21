import { createTheme, useTheme } from '@nextui-org/react';

export const lightTheme = createTheme({
  className: 'LightTheme',
  type: 'light',
});

export const darkTheme = createTheme({
  className: 'DarkTheme',
  type: 'dark',
});

export const useAppTheme = useTheme;
