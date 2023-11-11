import { ExtendedMission } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import MissionStatus from './MissionStatus';
import SkillLevel from './SkillLevel';
import LikeBtn from '../Button/LikeBtn';
import VoteBtn from '../Button/VoteBtn';
import Bookmark from '../Button/Bookmark';
import Link from 'next/link';

export default function MissionCard({
  mission,
  userId,
}: {
  mission: ExtendedMission;
  userId: string;
}) {
  return (
    <div className='flex flex-col justify-between rounded-md bg-light-3 p-6 shadow transition-all hover:shadow-lg'>
      <div className='mb-4 grid grid-cols-6 items-start gap-4'>
        <MissionStatus status={mission.missionStatus} />
        <Link
          href={`${ROUTES.MISSIONS}/${mission.id}`}
          className='col-span-5 line-clamp-2 max-h-20 font-main text-4xl tracking-wider text-dark-1 hover:text-primary-1 focus:text-lime-500'
        >
          {mission.missionName}
        </Link>
      </div>
      <div className='mb-4'>
        <SkillLevel skillLevel={mission.skillLevel} />
      </div>
      <div className='mb-6'>
        <p className='text-sm leading-loose text-gray-4'>
          {mission.missionObjective}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold'>{mission.user.name}</span>
        <div className='flex items-center space-x-3'>
          <LikeBtn
            missionId={mission.id}
            likeCount={mission.likes.length}
            currRoute={ROUTES.MISSIONS}
            userLikes={mission.likes.some((like) => like.userId === userId)}
          />

          <VoteBtn
            missionId={mission.id}
            voteCount={mission.votes.length}
            currRoute={ROUTES.MISSIONS}
            userVotes={mission.votes.some((vote) => vote.userId === userId)}
          />
          <Bookmark
            userId={userId}
            missionId={mission.id}
            currRoute={ROUTES.MISSIONS}
          />
        </div>
      </div>
    </div>
  );
}
