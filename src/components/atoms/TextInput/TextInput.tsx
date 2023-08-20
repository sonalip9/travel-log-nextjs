import { FormElement, Input, Textarea } from '@nextui-org/react';
import { Ref, forwardRef } from 'react';

import { useColor } from './hooks';
import { InputComponent, TextInputProps } from './types';

const TextInput = forwardRef(({ multiline, ...props }: TextInputProps, ref: Ref<FormElement>) => {
  const propsWithColor = useColor(props);

  if (multiline) {
    return <Textarea {...propsWithColor} />;
  }
  return <Input ref={ref} {...propsWithColor} />;
}) as InputComponent<FormElement, TextInputProps>;

const Password = (props: TextInputProps) => {
  const propsWithColor = useColor(props);
  return <Input.Password {...propsWithColor} />;
};

TextInput.displayName = 'TextInput';

TextInput.Password = Password;

export default TextInput;
