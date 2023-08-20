import { Image as NUIImage, ImageProps as NUIImageProps } from '@nextui-org/react';

export type ImageProps = NUIImageProps;

function Image(props: ImageProps) {
  return <NUIImage {...props} />;
}

export default Image;
