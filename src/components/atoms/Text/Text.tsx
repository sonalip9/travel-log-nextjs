'use client';
import { TextProps as NUIProps, Text, styled } from '@nextui-org/react';
import React, { forwardRef } from 'react';

/**
 * The props passed to the Text component.
 */
type TextProps = NUIProps & {
  row?: boolean;
  flex?: boolean;
  center?: boolean;
  right?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
};

/**
 * A component that renders a text element.
 *
 * @param props The props passed to the component.
 * @param ref The ref to the component.
 * @default props { transform:	"none", size:	"inherit", color:	"default", weight: "noset" }
 * @returns The Text component.
 */
const TextComponent = forwardRef(function (
  { css, row, flex, uppercase, lowercase, capitalize, transform, ...props }: TextProps,
  ref: React.Ref<HTMLElement>,
) {
  return (
    <Text
      ref={ref}
      css={{
        direction: row ? 'row' : 'column',
        display: flex ? 'flex' : css?.display,
        textAlign: props.center ? 'center' : props.right ? 'right' : css?.textAlign,
        ...css,
      }}
      transform={
        uppercase ? 'uppercase' : lowercase ? 'lowercase' : capitalize ? 'capitalize' : transform
      }
      {...props}
    />
  );
});

TextComponent.displayName = 'Text';

const StyledText = styled(TextComponent, {
  variants: {
    type: {
      displayLarge: {
        fontFamily: '$courgette',
        fontSize: '3.5625rem',
        fontWeight: 400,
        lineHeight: '4rem',
        letterSpacing: '-0.01563rem',
      },
      displayMedium: {
        fontFamily: '$courgette',
        fontSize: '2.8125rem',
        fontWeight: 400,
        lineHeight: '3.25rem',
      },
      displaySmall: {
        fontFamily: '$courgette',
        fontSize: '2.25rem',
        fontWeight: 400,
        lineHeight: '2.75rem',
      },
      headlineLarge: {
        fontFamily: '$nunito',
        fontSize: '2rem',
        fontWeight: 400,
        lineHeight: '2.5rem',
        textTransform: 'uppercase',
      },
      headlineMedium: {
        fontFamily: '$nunito',
        fontSize: '1.75rem',
        fontWeight: 400,
        lineHeight: '2.25rem',
        textTransform: 'uppercase',
      },
      headlineSmall: {
        fontFamily: '$nunito',
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: '2rem',
        textTransform: 'uppercase',
      },
      bodyLarge: {
        fontFamily: '$nunito',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.5rem',
        letterSpacing: '0.03125rem',
      },
      bodyMedium: {
        fontFamily: '$nunito',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.25rem',
        letterSpacing: '0.031563rem',
      },
      bodySmall: {
        fontFamily: '$nunito',
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '1rem',
      },
      titleLarge: {
        fontFamily: '$nunito',
        fontSize: '1.375rem',
        fontWeight: 400,
        lineHeight: '1.75rem',
      },
      titleMedium: {
        fontFamily: '$nunito',
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: '1.5rem',
        letterSpacing: '0.00938rem',
      },
      titleSmall: {
        fontFamily: '$nunito',
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: '1.25rem',
        letterSpacing: '0.00625rem',
      },
      labelLarge: {
        fontFamily: '$nunito',
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: '1.25rem',
        letterSpacing: '0.00625rem',
      },
      labelMedium: {
        fontFamily: '$nunito',
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: '1rem',
        letterSpacing: '0.03125rem',
      },
      labelSmall: {
        fontFamily: '$nunito',
        fontSize: '0.6875rem',
        fontWeight: 600,
        lineHeight: '1rem',
        letterSpacing: '0.03125rem',
      },
    },
  },
  defaultVariants: {
    type: 'bodySmall',
  },
});

export type StyledTextProps = React.ComponentProps<typeof StyledText>;

export default StyledText;
