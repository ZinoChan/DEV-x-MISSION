import Link from 'next/link';
import { HiMiniChevronDoubleLeft } from 'react-icons/hi2';
const BackBtn = ({ link }: { link: string }) => {
  return (
    <Link href={link} className='mb-4 flex items-center space-x-1'>
      <span className='rounded bg-primary-1 p-0.5 text-dark-1'>
        <HiMiniChevronDoubleLeft />
      </span>
      <h6 className='font-body text-sm font-bold'>Back</h6>
    </Link>
  );
};

export default BackBtn;
