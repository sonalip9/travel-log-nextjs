import { Button, ButtonProps as NUIButtonProps } from '@nextui-org/react';

export type ButtonProps = NUIButtonProps;

function ButtonComponent(props: ButtonProps) {
  return <Button {...props} />;
}

ButtonComponent.displayName = 'Button';

ButtonComponent.Group = Button.Group;

export default ButtonComponent;
