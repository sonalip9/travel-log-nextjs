import { Container, ContainerProps as NUIContainerProps } from '@nextui-org/react';
import { forwardRef, useId, useImperativeHandle } from 'react';

export type ContainerProps = NUIContainerProps & {
  row?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
  flex?: boolean;
};

const ContainerComponent = forwardRef(function (
  { css, row, alignCenter, justifyCenter, flex, ...props }: ContainerProps,
  ref: React.Ref<HTMLElement>,
) {
  const flexDirection = row ? 'row' : 'column';

  const id = useId();
  useImperativeHandle(ref, () => document.getElementById(id) as HTMLElement, [id]);

  return (
    <Container
      fluid
      alignItems={alignCenter ? 'center' : undefined}
      css={{ m: 0, ...css }}
      direction={flexDirection}
      display={flex ? 'flex' : undefined}
      gap={0}
      id={id}
      justify={justifyCenter ? 'center' : undefined}
      wrap="nowrap"
      {...props}
    />
  );
});

ContainerComponent.displayName = 'Container';

export default ContainerComponent;
