import Image from 'next/image';
import { AiFillProfile } from 'react-icons/ai';

type Props = {
  src?: string | null;
  alt?: string | null;
  size: 'sm' | 'md';
};

export const Avatar = ({ src, alt, size }: Props) => {
  let width = 98;
  let height = 98;
  if (size == 'sm') {
    width = 32;
    height = 32;
  }
  return (
    <>
      {src != null ? (
        <Image
          src={src}
          width={width}
          height={height}
          className='rounded-full'
          alt={alt ?? 'user'}
        />
      ) : (
        <div
          style={{ width, height }}
          className='rounded-full bg-primary-1 text-dark-1'
        >
          <AiFillProfile />
        </div>
      )}
    </>
  );
};
