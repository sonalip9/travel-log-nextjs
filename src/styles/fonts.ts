import { Courgette, Nunito_Sans } from 'next/font/google';

export const courgette = Courgette({
  adjustFontFallback: true,
  fallback: ['cursive'],
  preload: true,
  style: 'normal',
  subsets: ['latin'],
  weight: '400',
  variable: '--courgette',
});

export const nunitoSans = Nunito_Sans({
  adjustFontFallback: true,
  fallback: ['sans'],
  preload: true,
  style: 'normal',
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--nunito',
});
