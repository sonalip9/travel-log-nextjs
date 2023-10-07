'use client';
import { useState } from 'react';

import { useColor } from './hooks';
import TextInput from './TextInput';
import { TextInputProps } from './types';

import { EyeFilled, EyeSlashFilled } from '@icons';

const Password = (props: TextInputProps) => {
  const propsWithColor = useColor(props);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <TextInput
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilled className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeFilled className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      {...propsWithColor}
      type={isVisible ? 'text' : 'password'}
    />
  );
};

export default Password;
