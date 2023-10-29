'use client';
import { vote } from '@/actions/vote.action';
import toast from 'react-hot-toast';
import { BiUpvote, BiSolidUpvote } from 'react-icons/bi';
import { experimental_useOptimistic as useOptimistic } from 'react';
import Spinner from '../Spinner';

type Props = {
  missionId: string;
  currRoute: string;
  voteCount: number;
  userVotes: boolean;
};

const VoteBtn = ({ missionId, currRoute, voteCount, userVotes }: Props) => {
  const [optimisticVote, addOptimisticVote] = useOptimistic(
    { voteCount, sending: false },
    (state, newVoteCount: number) => ({
      ...state,
      voteCount: newVoteCount,
      sending: true,
    })
  );
  const handleLike = async () => {
    const optimisticResult = userVotes
      ? optimisticVote.voteCount - 1
      : optimisticVote.voteCount + 1;
    addOptimisticVote(optimisticResult);
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
      <span className='ml-1'>
        {optimisticVote.sending ? <Spinner /> : optimisticVote.voteCount}
      </span>
    </button>
  );
};

export default VoteBtn;
