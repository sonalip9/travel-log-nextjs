import { Container, ContainerProps as NUIContainerProps } from '@nextui-org/react';

export type ContainerProps = NUIContainerProps & {
  row?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
  flex?: boolean;
};

function ContainerComponent({
  css,
  row,
  alignCenter,
  justifyCenter,
  flex,
  ...props
}: ContainerProps) {
  const flexDirection = row ? 'row' : 'column';
  return (
    <Container
      fluid
      alignItems={alignCenter ? 'center' : undefined}
      css={{ m: 0, ...css }}
      direction={flexDirection}
      display={flex ? 'flex' : undefined}
      gap={0}
      justify={justifyCenter ? 'center' : undefined}
      wrap="nowrap"
      {...props}
    />
  );
}

export default ContainerComponent;
