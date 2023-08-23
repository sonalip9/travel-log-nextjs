import { Image, ImageProps } from '@components/Image';

export type ExpandImageProps = {
  onHoverStyles?: Record<string, unknown>;
} & ImageProps;

function ExpandImage({ onHoverStyles, containerCss, css, alt, ...props }: ExpandImageProps) {
  return (
    <Image
      alt={alt}
      containerCss={{
        m: '$none',
        flex: 1,
        aspectRatio: 1,
        '&:hover': {
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: 999,
          top: 0,
          left: 0,
          '&:hover > img': {
            aspectRatio: 'auto',
            objectFit: 'contain',
            transform: 'scale(0.85)',
            transition: 'all 0.2s ease-in-out',
          },
          ...onHoverStyles,
        },
        ...containerCss,
      }}
      css={{ aspectRatio: 1, objectFit: 'cover', width: 'auto', ...css }}
      {...props}
    />
  );
}

export default ExpandImage;
