import { Photo } from '@defs/pages';

export const photoObjectToFile = async (photo: Photo) => {
  const { mimetype, originalname } = photo;
  const res = await fetch(getSrcForImage(photo));
  const blob = await res.blob();

  const file = new File([blob], originalname, { type: mimetype });

  return file;
};

export const getSrcForImage = (...args: [string, string] | [Photo | File]): string => {
  let mimetype: string;
  let buffer: string;
  if (args.length === 1) {
    if (args[0] instanceof File) {
      return URL.createObjectURL(args[0]);
    }
    [{ mimetype, buffer }] = args;
  } else {
    [mimetype, buffer] = args;
  }
  return `data:${mimetype};base64,${buffer}`;
};
