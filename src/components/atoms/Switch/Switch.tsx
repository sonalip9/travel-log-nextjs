'use client';
import { Switch as NUISwitch, SwitchProps as NUISwitchProps } from '@nextui-org/react';

export type SwitchProps = NUISwitchProps;

function Switch(props: SwitchProps) {
  return <NUISwitch {...props} />;
}

export default Switch;
