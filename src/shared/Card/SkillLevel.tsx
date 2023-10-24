import { SKILL_LEVELS } from '@/constants/missionData';
import {
  SkillLevelAdvanced,
  SkillLevelBasic,
  SkillLevelIntermediate,
} from '@carbon/icons-react';

const SkillLevel = ({ skillLevel }: { skillLevel: string }) => {
  const levelToLower = skillLevel.toLowerCase();
  const { BEGINNER, INTERMEDIATE, ADVANCED } = SKILL_LEVELS;

  if (levelToLower === BEGINNER)
    return (
      <span className='inline-flex items-center space-x-1 rounded border-2 border-green-400 text-sm'>
        <span className='flex h-auto w-6 items-center justify-center self-stretch bg-green-400 text-white'>
          <SkillLevelBasic />
        </span>
        <span className='p-1 font-bold text-green-400'>{skillLevel}</span>
      </span>
    );

  if (levelToLower === INTERMEDIATE)
    return (
      <span className='inline-flex items-center space-x-1 rounded border-2 border-yellow-400 text-sm'>
        <span className='flex h-auto w-6 items-center justify-center self-stretch bg-yellow-400 text-white'>
          <SkillLevelIntermediate />
        </span>
        <span className='p-1 font-bold text-yellow-400'>{skillLevel}</span>
      </span>
    );
  if (levelToLower === ADVANCED)
    return (
      <span className='inline-flex items-center space-x-1 rounded border-2 border-red-400 text-sm'>
        <span className='flex h-auto w-6 items-center justify-center self-stretch bg-red-400 text-white'>
          <SkillLevelAdvanced />
        </span>
        <span className='p-1 font-bold text-red-400'>{skillLevel}</span>
      </span>
    );

  return <></>;
};

export default SkillLevel;
