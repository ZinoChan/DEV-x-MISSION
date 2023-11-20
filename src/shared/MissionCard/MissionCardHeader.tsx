import { ROUTES } from '@/utils/routes';
import MissionStatus from './MissionStatus';
import SkillLevel from './SkillLevel';
import Link from 'next/link';

type Props = {
  id: string;
  missionStatus: string;
  missionName: string;
  skillLevel: string;
  missionObjective: string;
};

export default function MissionCardHeader({
  id,
  missionStatus,
  missionName,
  skillLevel,
  missionObjective,
}: Props) {
  return (
    <>
      <div className='mb-4 grid grid-cols-6 items-start gap-4'>
        <MissionStatus status={missionStatus} />
        <Link
          href={`${ROUTES.MISSIONS}/${id}`}
          className='col-span-5 line-clamp-2 max-h-20 font-main text-4xl tracking-wider text-dark-1 hover:text-primary-1 focus:text-lime-500'
        >
          {missionName}
        </Link>
      </div>
      <div className='mb-4'>
        <SkillLevel skillLevel={skillLevel} />
      </div>
      <div className='mb-6'>
        <p className='text-sm leading-loose text-gray-4'>{missionObjective}</p>
      </div>
    </>
  );
}
