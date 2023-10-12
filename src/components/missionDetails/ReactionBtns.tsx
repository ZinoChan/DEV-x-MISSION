'use client';
import { BiComment, BiHeart, BiUpvote, BiBookmark } from 'react-icons/bi';
import { useCommentsContext } from '@/context/comments';

const ReactionBtns = () => {
  const { setOpen } = useCommentsContext();
  return (
    <div className='flex items-baseline space-x-3'>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center hover:text-secondary-3'
      >
        <BiComment className='text-xl' />
        <span className='ml-1'>10</span>
      </button>
      <button className='flex items-center hover:text-red-500'>
        <BiHeart className='text-xl' />
        <span className='ml-1'>25</span>
      </button>
      <button className='flex items-center hover:text-yellow-500'>
        <BiUpvote className='text-xl' />
        <span className='ml-1'>15</span>
      </button>
      <button className='flex items-center hover:text-primary-2'>
        <BiBookmark className='text-xl' />
      </button>
    </div>
  );
};

export default ReactionBtns;
