'use client';
import {
  extendVariants,
  Button as NUIButton,
  ButtonProps as NUIButtonProps,
} from '@nextui-org/react';
import { ComponentPropsWithoutRef } from 'react';

import { Loading } from '@components/Loading';

type ButtonProps = NUIButtonProps & {
  isLoading?: boolean;
  children?: React.ReactNode;
} & { Group: React.ReactNode };

function ButtonComponent({ isLoading, children, ...props }: ButtonProps) {
  return (
    <NUIButton {...props}>{isLoading ? <Loading color="current" size="sm" /> : children}</NUIButton>
  );
}
const StyledButton = extendVariants(ButtonComponent, {
  variants: {
    color: {
      error: 'text-onErrorContainer bg-errorContainer',
    },
    variant: {
      bordered: '',
      ghost: '',
      light: '',
      solid: '',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'light',
      className: 'text-primary bg-transparent',
    },
    {
      color: 'primary',
      variant: 'solid',
      className: 'text-onPrimaryContainer bg-primaryContainer',
    },
    {
      color: 'primary',
      variant: 'ghost',
      className:
        'text-onPrimaryContainer hover:!bg-onPrimaryContainer hover:!text-primaryContainer border-onPrimaryContainer',
    },
  ],
  defaultVariants: {
    color: 'primary',
  },
});

export type StyledButtonProps = ComponentPropsWithoutRef<typeof StyledButton>;

ButtonComponent.displayName = 'Button';

export default StyledButton;
