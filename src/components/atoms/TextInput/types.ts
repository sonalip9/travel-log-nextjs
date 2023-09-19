import { InputProps, TextAreaProps } from '@nextui-org/react';
import { ComponentType, PropsWithoutRef, RefAttributes } from 'react';

export type TextInputProps = InputProps & {
  primary?: boolean;
  default?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
} & (({ multiline: true } & TextAreaProps) | { multiline?: false });

export type InputComponent<T, P = Record<string, never>> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & { Password: ComponentType<TextInputProps> };
