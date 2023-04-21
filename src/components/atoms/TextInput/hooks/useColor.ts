import { TextInputProps } from '../types';

export const useColor = (props: TextInputProps): TextInputProps['color'] => {
  const { primary, default: def, secondary, success, warning, error } = props;

  // Check if more than one color variant is being used at the same time
  [primary, def, secondary, success, warning, error].filter((item) => item).length > 1 &&
    console.warn(
      'You are using more than one color variant at the same time in TextInput component. Please verify your code.',
    );

  switch (true) {
    case primary:
      return 'primary';
    case secondary:
      return 'secondary';
    case success:
      return 'success';
    case warning:
      return 'warning';
    case error:
      return 'error';
    case def:
    default:
      return 'default';
  }
};
