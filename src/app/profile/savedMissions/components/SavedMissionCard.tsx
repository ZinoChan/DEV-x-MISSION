import { ROUTES } from '@/utils/routes';
import MissionStatus from '@/shared/Card/MissionStatus';
import SkillLevel from '@/shared/Card/SkillLevel';
import Link from 'next/link';
import { Mission } from '@prisma/client';

export default function SavedMissionCard({ mission }: { mission: Mission }) {
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
    </div>
  );
}
