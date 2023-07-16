import { Button, ButtonProps as NUIButtonProps, styled } from '@nextui-org/react';

import { Loading } from '@components/Loading';

export type ButtonProps = Omit<NUIButtonProps, 'color'> & {
  color?: 'default' | 'primary';
  isLoading?: boolean;
};

function ButtonComponent({ isLoading, children, ...props }: ButtonProps) {
  const StyledButton = styled(Button, {
    variants: {
      color: {
        default: { bg: '$primaryContainer', color: '$onPrimaryContainer' },
        primary: { bg: '$primaryContainer', color: '$onPrimaryContainer' },
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
      color: 'default',
    },
  });

  return (
    <StyledButton {...props}>
      {isLoading ? <Loading color="currentColor" size="sm" type="default" /> : children}
    </StyledButton>
  );
}

ButtonComponent.displayName = 'Button';

ButtonComponent.Group = Button.Group;

export default ButtonComponent;
