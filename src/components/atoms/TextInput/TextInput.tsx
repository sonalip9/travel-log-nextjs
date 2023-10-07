'use client';
import { Input, Textarea } from '@nextui-org/react';
import { forwardRef } from 'react';

import { useColor } from './hooks';
import { TextInputProps } from './types';

const TextInput = forwardRef(
  ({ multiline, ...props }: TextInputProps, ref: TextInputProps['ref']) => {
    const propsWithColor = useColor(props);

    if (multiline) {
      return <Textarea {...propsWithColor} />;
    }
    return <Input ref={ref} {...propsWithColor} />;
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
