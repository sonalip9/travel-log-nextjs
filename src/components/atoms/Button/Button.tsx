import { Button, ButtonProps as NUIButtonProps } from '@nextui-org/react';

import { Loading } from '@components/Loading';

export type ButtonProps = NUIButtonProps & {
  isLoading?: boolean;
};

function ButtonComponent({ isLoading, ...props }: ButtonProps) {
  return (
    <Button {...props}>
      {isLoading ? <Loading color="currentColor" size="sm" type="default" /> : props.children}
    </Button>
  );
}

ButtonComponent.displayName = 'Button';

ButtonComponent.Group = Button.Group;

export default ButtonComponent;
