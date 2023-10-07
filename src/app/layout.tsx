'use client';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import '../styles/globals.css';

import { courgette, nunitoSans } from '@styles/fonts';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${courgette.variable} font-sans`}>
        <NextThemesProvider attribute="class" defaultTheme="system">
          <NextUIProvider>
            <SessionProvider>
              <main className={`${nunitoSans.variable} ${courgette.variable} font-sans`}>
                {children}
              </main>
            </SessionProvider>
          </NextUIProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
};

export default RootLayout;
