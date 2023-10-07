'use client';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import '../styles/globals.css';

import { courgette, nunitoSans } from '@styles/fonts';

const RootLayout = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${courgette.variable} font-sans`}>
        <NextThemesProvider attribute="class" defaultTheme="system">
          <NextUIProvider>
            <SessionProvider session={session}>
              <main className={`${nunitoSans.variable} ${courgette.variable} font-sans`}>
                <Component {...pageProps} />
              </main>
            </SessionProvider>
          </NextUIProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
};

export default RootLayout;
