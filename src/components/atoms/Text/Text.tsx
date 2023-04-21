import { Text, TextProps as NUIProps } from '@nextui-org/react';

/**
 * The props passed to the Text component.
 */
export type TextProps = NUIProps & {
  row?: boolean;
  flex?: boolean;
  center?: boolean;
  right?: boolean;
};

/**
 * A component that renders a text element.
 * @param props The props passed to the component.
 * @returns The Text component.
 */
function TextComponent({ css, row, flex, ...props }: TextProps) {
  return (
    <Text
      css={{
        direction: row ? 'row' : 'column',
        display: flex ? 'flex' : undefined,
        gap: 0,
        m: 0,
        textAlign: props.center ? 'center' : props.right ? 'right' : undefined,
        ...css,
      }}
      {...props}
    />
  );
}

export default TextComponent;
