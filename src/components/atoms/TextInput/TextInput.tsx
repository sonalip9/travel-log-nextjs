import { Input, Textarea } from '@nextui-org/react';

import { useColor } from './hooks';
import { TextInputProps } from './types';

export default function TextInput({ multiline, ...props }: TextInputProps) {
  const propsWithColor = useColor(props);

  if (multiline) {
    return <Textarea {...propsWithColor} />;
  }
  return <Input {...propsWithColor} />;
}

const Password = (props: TextInputProps) => {
  const propsWithColor = useColor(props);
  return <Input.Password {...propsWithColor} />;
};

TextInput.Password = Password;
