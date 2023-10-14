import Image from 'next/image';
import { AiFillProfile } from 'react-icons/ai';

type Props = {
  src?: string | null;
  alt?: string | null;
  size: 'sm' | 'md';
};

export const Avatar = ({ src, alt, size }: Props) => {
  if (size == 'sm')
    return (
      <>
        {src != null ? (
          <Image
            src={src}
            width={32}
            height={32}
            className='rounded-full'
            alt={alt != null ? alt : 'user'}
          />
        ) : (
          <div className='h-8 w-8 rounded-full bg-primary-1 text-dark-1'>
            <AiFillProfile />
          </div>
        )}
      </>
    );
  return (
    <>
      {src != null ? (
        <Image
          src={src}
          width={98}
          height={98}
          className='rounded-full'
          alt={alt != null ? alt : 'user'}
        />
      ) : (
        <div className='h-24 w-24 rounded-full bg-primary-1 text-dark-1'>
          <AiFillProfile />
        </div>
      )}
    </>
  );
};
