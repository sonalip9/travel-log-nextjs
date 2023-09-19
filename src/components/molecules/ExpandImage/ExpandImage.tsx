import { useMemo } from 'react';

import { Image, ImageProps } from '@components/Image';

export type ExpandImageProps = {
  onHoverStyles?: string;
} & ImageProps;

const hoverWrapperStyles = 'w-full h-full fixed z-999 top-0 left-0';

function ExpandImage({
  onHoverStyles,
  classNames: { img = '', wrapper = '', ...rest } = {},
  alt,
  ...props
}: ExpandImageProps) {
  const hoverContainerStyles = useMemo(
    () =>
      `${hoverWrapperStyles} ${onHoverStyles || ''}`
        .split(' ')
        .map((style) => (style.startsWith('hover:') ? style : `hover:${style}`))
        .join(' '),
    [onHoverStyles],
  );

  return (
    <Image
      alt={alt}
      classNames={{
        img: `aspect-square object-center w-auto ${img as string}`,
        wrapper: `m-none flex-1 aspect-square  ${hoverContainerStyles} ${wrapper as string}`,
        ...rest,
      }}
      {...props}
    />
  );
}

// [:hover>img]:aspect-auto [:hover>img]:object-contain [:hover>img]:scale-[85] [:hover>img]:transition-all [:hover>img]:ease-in-out [:hover>img]:duration-200

export default ExpandImage;
