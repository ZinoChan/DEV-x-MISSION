'use client';
import { vote } from '@/actions/vote.action';
import toast from 'react-hot-toast';
import { BiUpvote, BiSolidUpvote } from 'react-icons/bi';

type Props = {
  missionId: string;
  currRoute: string;
  voteCount: number;
  userVotes: boolean;
};

const VoteBtn = ({ missionId, currRoute, voteCount, userVotes }: Props) => {
  const handleLike = async () => {
    const res = await vote(missionId, currRoute);
    if (!res.success) toast(res.message);
  };

  return (
    <button
      onClick={handleLike}
      className='flex items-center text-gray-800 hover:text-yellow-500'
    >
      {userVotes ? (
        <BiSolidUpvote className='text-xl text-yellow-500' />
      ) : (
        <BiUpvote className='text-xl' />
      )}
      <span className='ml-1'>{voteCount}</span>
    </button>
  );
};

export default VoteBtn;
