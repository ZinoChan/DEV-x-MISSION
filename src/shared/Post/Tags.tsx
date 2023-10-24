import { SKILL_LEVELS, MISSIONS_STATUS } from '@/constants/missionData';

export const LevelTag = ({ skillLevel }: { skillLevel: string }) => {
  const levelToLower = skillLevel.toLowerCase();
  const { BEGINNER, INTERMEDIATE, ADVANCED } = SKILL_LEVELS;
  if (levelToLower === BEGINNER)
    return (
      <span className='rounded-full bg-green-50 px-3 py-1 text-sm font-bold capitalize  text-green-400'>
        {skillLevel}
      </span>
    );
  if (levelToLower === INTERMEDIATE)
    return (
      <span className='rounded-full bg-yellow-50 px-3 py-1 text-sm font-bold capitalize text-yellow-400'>
        {skillLevel}
      </span>
    );
  if (levelToLower === ADVANCED)
    return (
      <span className='rounded-full bg-red-50 px-3 py-1 text-sm font-bold capitalize  text-red-400'>
        {skillLevel}
      </span>
    );
  return <></>;
};

export const StatusTag = ({ status }: { status: string }) => {
  const statusToLower = status.toLowerCase();
  const { IDEATION, PROTOTYPE, TESTING, DEVELOPMENT } = MISSIONS_STATUS;

  if (statusToLower === IDEATION)
    return (
      <span className='rounded-full bg-purple-50 px-3 py-1 text-sm font-bold capitalize  text-purple-400'>
        {status}
      </span>
    );
  if (statusToLower === PROTOTYPE)
    return (
      <span className='rounded-full bg-blue-50 px-3 py-1 text-sm font-bold capitalize  text-blue-400'>
        {status}
      </span>
    );
  if (statusToLower === TESTING)
    return (
      <span className='rounded-full bg-pink-50 px-3 py-1 text-sm font-bold capitalize  text-pink-400'>
        {status}
      </span>
    );
  if (statusToLower === DEVELOPMENT)
    return (
      <span className='rounded-full bg-orange-50 px-3 py-1 text-sm font-bold capitalize  text-secondary-2'>
        {status}
      </span>
    );
  return <></>;
};
