'use client';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

/**
 * The props passed to the Text component.
 */
export type TextProps = ComponentPropsWithoutRef<'p'> & {
  row?: boolean;
  flex?: boolean;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  maxLines?: number;
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
  {
    row,
    flex,
    uppercase,
    lowercase,
    capitalize,
    center,
    left,
    right,
    className,
    ...props
  }: TextProps,
  ref: React.Ref<HTMLParagraphElement>,
) {
  const textTransform = uppercase
    ? 'uppercase'
    : lowercase
    ? 'lowercase'
    : capitalize
    ? 'capitalize'
    : 'none';

  const display = flex ? 'flex' : 'block';
  const textAlignment = center
    ? 'text-center'
    : left
    ? 'text-left'
    : right
    ? 'text-right'
    : 'text-left';

  return (
    <p
      ref={ref}
      className={`text ${display} ${textAlignment} ${textTransform} ${row ? 'row' : 'column'} ${
        className || ''
      }`}
      {...props}
    />
  );
});

TextComponent.displayName = 'Text';

export default TextComponent;
