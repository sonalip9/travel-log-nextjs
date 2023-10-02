import { useMemo } from 'react';

import { Image, ImageProps } from '@components/Image';

export type ExpandImageProps = {
  onHoverStyles?: string;
} & ImageProps;

const hoverWrapperStyles = 'w-auto h-auto fixed z-[999] top-0 left-0';
const hoverImageStyles =
  'transition-all group-hover:ease-in-out group-hover:duration-200 group-hover:object-contain group-hover:aspect-auto group-hover:scale-[0.85]';

function ExpandImage({
  onHoverStyles,
  classNames: { img = '', wrapper = '', ...rest } = {},
  alt,
  ...props
}: ExpandImageProps) {
  const hoverContainerStyles = useMemo(
    () =>
      `${hoverWrapperStyles} ${onHoverStyles || ''}`
        .trimEnd()
        .split(' ')
        .map((style) => (style.startsWith('hover:') ? style : `hover:${style}`))
        .join(' '),
    [onHoverStyles],
  );

  const hoverImgStyles = useMemo(
    () =>
      `${hoverImageStyles} ${(img as string) || ''}`
        .trimEnd()
        .split(' ')
        .map((style) => (style.startsWith('group-hover:') ? style : `group-hover:${style}`))
        .join(' '),
    [img],
  );

  return (
    <Image
      alt={alt}
      classNames={{
        img: `aspect-square object-cover w-auto ${img as string} ${hoverImgStyles}`,
        wrapper: `peer group m-none flex-1 aspect-square ${hoverContainerStyles} ${
          wrapper as string
        }`,
        ...rest,
      }}
      {...props}
    />
  );
}

export default ExpandImage;
