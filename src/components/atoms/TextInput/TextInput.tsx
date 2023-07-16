import { Input, Textarea } from '@nextui-org/react';

import { useColor } from './hooks';
import { TextInputProps } from './types';

export default function TextInput({ multiline, ...props }: TextInputProps) {
  const color = useColor(props);

  if (multiline) {
    return <Textarea color={color} {...props} />;
  }
  return <Input color={color} {...props} />;
}

const Password = (props: TextInputProps) => {
  const color = useColor(props);
  return <Input.Password color={color} {...props} />;
};

TextInput.Password = Password;
