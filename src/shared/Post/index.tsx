import ReactionBtns from '@/components/missionDetails/ReactionBtns';
import EditBtns from '@/components/profile/EditBtns';
import { fakeMission } from '@/data';
import Markdown from 'react-markdown';

type Props = {
  reactionBtns?: boolean;
  editBtns?: boolean;
  mission_slug?: string;
};

const Post = ({ reactionBtns, editBtns, mission_slug }: Props) => {
  return (
    <div>
      <h1 className='my-6 text-3xl tracking-wider md:text-6xl'>
        Mission: colony on mars for anime lovers
      </h1>
      <div className='mb-6 flex items-center space-x-3'>
        <span className='rounded-full bg-green-300 px-3 py-1 text-sm font-bold capitalize'>
          junior
        </span>
      </div>

      <div className='flex flex-col justify-between space-y-4 border-b border-b-gray-200 py-4 text-sm text-gray-4  sm:flex-row sm:items-center sm:space-y-0'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-3'>
            <div className='h-10 w-10  rounded-full bg-gray-300'></div>
            <p className='text-sm font-bold capitalize text-dark-1'>
              zino chan
            </p>
          </div>
          <p className='text-xs font-medium'>2 minutes read</p>
        </div>
        {(reactionBtns ?? false) && <ReactionBtns />}
        {(editBtns ?? false) && mission_slug != null ? (
          <EditBtns missionId={mission_slug} />
        ) : null}
      </div>
      <div className='prose mb-6'>
        <Markdown>{fakeMission}</Markdown>
      </div>
    </div>
  );
};

export default Post;
