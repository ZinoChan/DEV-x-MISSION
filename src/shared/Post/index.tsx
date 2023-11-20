import ReactionBtns from '@/components/missionDetails/ReactionBtns';
import EditBtns from '@/components/profile/EditBtns';
import { MissionWithComments } from '@/types/mission.types';
import Markdown from 'react-markdown';
import { LevelTag, StatusTag } from './Tags';
import Avatar from '@/shared/Avatar';

type Props = {
  reactionBtns?: boolean;
  editBtns?: boolean;
  missionId?: string;
  mission: MissionWithComments;
  userId?: string;
};

const Post = ({
  reactionBtns,
  editBtns,
  missionId,
  mission,
  userId,
}: Props) => {
  return (
    <div>
      <h1 className='my-6 text-3xl tracking-wider md:text-6xl'>
        Mission: {mission.missionName}
      </h1>
      <div className='mb-6 flex items-center space-x-3'>
        <LevelTag skillLevel={mission.skillLevel} />
        <StatusTag status={mission.missionStatus} />
      </div>

      <div className='flex flex-col justify-between space-y-4 border-b border-b-gray-200 py-4 text-sm text-gray-4  sm:flex-row sm:items-center sm:space-y-0'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-3'>
            <Avatar
              src={mission.user.image}
              alt={mission.user.name}
              size='sm'
            />
            <p className='text-sm font-bold capitalize text-dark-1'>
              {mission.user.name}
            </p>
          </div>
          <p className='text-xs font-medium'>2 minutes read</p>
        </div>
        {(reactionBtns ?? false) && userId != null && (
          <ReactionBtns userId={userId} mission={mission} />
        )}
        {(editBtns ?? false) && missionId != null ? (
          <EditBtns missionId={missionId} />
        ) : null}
      </div>
      <div className='prose mb-6'>
        <Markdown>{mission.missionDetails}</Markdown>
      </div>
    </div>
  );
};

export default Post;
