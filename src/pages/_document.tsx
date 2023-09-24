import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { courgette, nunitoSans } from '@styles/fonts';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className={`${nunitoSans.variable} ${courgette.variable} font-sans`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
