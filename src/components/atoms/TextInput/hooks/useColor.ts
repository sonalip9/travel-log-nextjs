import { TextInputProps } from '../types';

export const useColor = (props: TextInputProps): TextInputProps => {
  const { primary, default: def, secondary, success, warning, error, ...rest } = props;

  // Check if more than one color variant is being used at the same time
  [primary, def, secondary, success, warning, error].filter((item) => item).length > 1 &&
    console.warn(
      'You are using more than one color variant at the same time in TextInput component. Please verify your code.',
    );

  let color: TextInputProps['color'] = 'default';

  switch (true) {
    case primary:
      color = 'primary';
      break;
    case secondary:
      color = 'secondary';
      break;
    case success:
      color = 'success';
      break;
    case warning:
      color = 'warning';
      break;
    case error:
      color = 'danger';
      break;
    case def:
    default:
      color = 'default';
  }
  return { color, ...rest };
};
