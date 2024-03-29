'use client';
import { like } from '@/actions/likes.action';
import { BiHeart } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { BsFillHeartFill } from 'react-icons/bs';
import { useOptimistic } from 'react';

import Spinner from '../Spinner';

type Props = {
  missionId: string;
  currRoute: string;
  likeCount: number;
  userLikes: boolean;
};

const LikeBtn = ({ missionId, currRoute, likeCount, userLikes }: Props) => {
  const [optimisticLike, addOptimisticLike] = useOptimistic(
    { likeCount, sending: false },
    (state, newLikeCount: number) => ({
      ...state,
      likeCount: newLikeCount,
      sending: true,
    })
  );
  const handleLike = async () => {
    const optimisticResult = userLikes
      ? optimisticLike.likeCount - 1
      : optimisticLike.likeCount + 1;
    addOptimisticLike(optimisticResult);
    try {
      const res = await like(missionId, currRoute);
      if (!res.success) toast.error(res.message);
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <button
      onClick={handleLike}
      className='flex items-center text-gray-800 hover:text-red-500'
    >
      {userLikes ? (
        <BsFillHeartFill className='text-xl text-red-500' />
      ) : (
        <BiHeart className='text-xl' />
      )}
      <span className='ml-1'>
        {optimisticLike.sending == true ? (
          <Spinner />
        ) : (
          optimisticLike.likeCount
        )}
      </span>
    </button>
  );
};

export default LikeBtn;
