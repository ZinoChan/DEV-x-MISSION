'use client';
import { BiComment, BiBookmark } from 'react-icons/bi';
import { useCommentsContext } from '@/context/comments';
import { MissionWithComments } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import LikeBtn from '@/shared/Button/LikeBtn';
import VoteBtn from '@/shared/Button/VoteBtn';

const ReactionBtns = ({ mission }: { mission: MissionWithComments }) => {
  const { setOpen } = useCommentsContext();
  return (
    <div className='flex items-baseline space-x-3'>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center hover:text-secondary-3'
      >
        <BiComment className='text-xl' />
        <span className='ml-1'>{mission.comments.length}</span>
      </button>
      <LikeBtn
        missionId={mission.id}
        likeCount={mission.likes.length}
        currRoute={ROUTES.MISSIONS}
        userLikes={mission.likes.some((like) => like.userId === mission.userId)}
      />
      <VoteBtn
        missionId={mission.id}
        voteCount={mission.votes.length}
        currRoute={ROUTES.MISSIONS}
        userVotes={mission.votes.some((vote) => vote.userId === mission.userId)}
      />
      <button className='flex items-center hover:text-primary-2'>
        <BiBookmark className='text-xl' />
      </button>
    </div>
  );
};

export default ReactionBtns;
