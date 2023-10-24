import { BsBookmarks, BsHeart } from 'react-icons/bs';
import { BiUpvote } from 'react-icons/bi';
import Link from 'next/link';
import { ExtendedMission } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import MissionStatus from './MissionStatus';
import SkillLevel from './SkillLevel';

const MissionCard = ({ mission }: { mission: ExtendedMission }) => {
  return (
    <div className='rounded-md bg-light-3 p-6 shadow transition-all hover:shadow-lg'>
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
          <div className='flex items-center space-x-1 text-sm font-medium'>
            <BsHeart className='text-lg text-secondary-1' />
            <span className='text-gray-4'>{mission.likes.length}</span>
          </div>
          <div className='flex items-center space-x-1 text-base'>
            <BiUpvote className='text-xl text-secondary-2' />
            <span className=' text-gray-4'>{mission.likes.length}</span>
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
