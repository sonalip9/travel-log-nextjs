import { Col, ColProps } from '@nextui-org/react';

export type ColumnProps = ColProps & {
  flex?: boolean;
  row?: boolean;
  column?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
};

function Column({ flex, row, column, alignCenter, justifyCenter, css, ...props }: ColumnProps) {
  return (
    <Col
      css={{
        display: flex ? 'flex' : css?.display,
        flexDirection: row ? 'row' : column ? 'column' : css?.flexDirection,
        alignItems: alignCenter ? 'center' : css?.alignItems,
        justifyContent: justifyCenter ? 'center' : css?.justifyContent,
        ...css,
      }}
      {...props}
    />
  );
}

export default Column;
