import { Courgette, Nunito_Sans } from 'next/font/google';

const courgette = Courgette({
  adjustFontFallback: true,
  fallback: ['cursive'],
  preload: true,
  style: 'normal',
  subsets: ['latin'],
  weight: '400',
});

const nunitoSans = Nunito_Sans({
  adjustFontFallback: true,
  fallback: ['sans'],
  preload: true,
  style: 'normal',
  subsets: ['latin'],
  weight: ['400', '600'],
});

const fonts = {
  sans: nunitoSans.style.fontFamily,
  courgette: courgette.style.fontFamily,
  nunito: nunitoSans.style.fontFamily,
};

export default fonts;
