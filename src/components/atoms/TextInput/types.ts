import { InputProps } from '@nextui-org/react';

export type TextInputProps = InputProps & {
  primary?: boolean;
  default?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
};
