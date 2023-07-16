import { InputProps } from '@nextui-org/react';
import { TextareaProps } from '@nextui-org/react/types/textarea';

export type TextInputProps = InputProps & {
  primary?: boolean;
  default?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
} & (({ multiline: true } & TextareaProps) | { multiline?: false });
