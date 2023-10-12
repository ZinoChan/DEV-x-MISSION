import {
  BsBookmarks,
  BsHeart,
  BsCodeSlash,
  BsFillBarChartFill,
} from 'react-icons/bs';
import { BiUpvote } from 'react-icons/bi';
import Link from 'next/link';

const MissionCard = () => {
  return (
    <div className='rounded-md bg-light-3 p-6 shadow transition-all hover:shadow-lg'>
      <div className='mb-4 flex items-start space-x-4'>
        <div className='flex h-16 w-20 items-center justify-center rounded bg-secondary-3 text-3xl'>
          <BsCodeSlash />
        </div>
        <Link
          href='/missions/mission-slug'
          className='font-main text-4xl tracking-wider text-dark-1'
        >
          E-commerce cart consturction
        </Link>
      </div>
      <div className='mb-4'>
        <span className='inline-flex items-center space-x-1 rounded border-2 border-yellow-400 text-sm'>
          <span className='flex h-auto w-6 items-center justify-center self-stretch bg-yellow-400 text-white'>
            <BsFillBarChartFill />
          </span>
          <span className='p-1 font-bold text-yellow-400'>intermediate</span>
        </span>
      </div>
      <div className='mb-6'>
        <p className='text-sm leading-loose text-gray-4'>
          Create a responsive landing page for a fictional product This mission
          will introduce agents to the basics of HTML, CSS, and design
          principles.
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold'>sakata gintoki</span>
        <div className='flex items-center space-x-3'>
          <div className='flex items-center space-x-1 text-sm font-medium'>
            <BsHeart className='text-lg text-secondary-1' />
            <span className='text-gray-4'>16</span>
          </div>
          <div className='flex items-center space-x-1 text-base'>
            <BiUpvote className='text-xl text-secondary-2' />
            <span className=' text-gray-4'>6</span>
          </div>
          <div className='flex items-center'>
            <BsBookmarks className='text-lg text-secondary-3' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
