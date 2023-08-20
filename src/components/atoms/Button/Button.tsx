import { Button, ButtonProps as NUIButtonProps, styled } from '@nextui-org/react';
import { useMemo } from 'react';

import { Loading } from '@components/Loading';

export type ButtonProps = Omit<NUIButtonProps, 'color'> & {
  color?: 'primary' | 'error';
  isLoading?: boolean;
};

function ButtonComponent({ isLoading, children, ...props }: ButtonProps) {
  const StyledButton = useMemo(
    () =>
      styled(Button, {
        variants: {
          color: {
            primary: { bg: '$primaryContainer', color: '$onPrimaryContainer' },
            error: { bg: '$errorContainer', color: '$onErrorContainer' },
          },
          light: {
            true: { bg: '$transparent', color: '$text' },
          },
        },
        compoundVariants: [
          {
            color: 'primary',
            light: true,
            css: { bg: '$transparent', color: '$primary' },
          },
        ],
        defaultVariants: {
          color: 'primary',
        },
      }),
    [],
  );

  return (
    <StyledButton {...props}>
      {isLoading ? <Loading color="currentColor" size="sm" type="default" /> : children}
    </StyledButton>
  );
}

ButtonComponent.displayName = 'Button';

ButtonComponent.Group = Button.Group;

export default ButtonComponent;
