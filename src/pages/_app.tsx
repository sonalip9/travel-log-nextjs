import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { darkTheme, lightTheme } from '@styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: lightTheme.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}
