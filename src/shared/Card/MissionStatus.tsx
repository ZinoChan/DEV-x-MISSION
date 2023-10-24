import { MISSIONS_STATUS } from '@/constants/missionData';
import { BsCodeSlash, BsStars } from 'react-icons/bs';
import { ImLab } from 'react-icons/im';
import { FaPencilRuler } from 'react-icons/fa';

const MissionStatus = ({ status }: { status: string }) => {
  const statusToLower = status.toLowerCase();
  const { IDEATION, PROTOTYPE, TESTING, DEVELOPMENT } = MISSIONS_STATUS;

  if (statusToLower === IDEATION) {
    return (
      <div className='flex h-12 w-full items-center justify-center rounded bg-secondary-3 text-3xl text-white'>
        <BsStars />
      </div>
    );
  } else if (statusToLower === PROTOTYPE) {
    return (
      <div className='flex h-12 w-full items-center justify-center rounded bg-primary-2 text-3xl text-white'>
        <FaPencilRuler />
      </div>
    );
  } else if (statusToLower === DEVELOPMENT) {
    return (
      <div className='flex h-12 w-full items-center justify-center rounded bg-secondary-2 text-3xl text-dark-1'>
        <BsCodeSlash />
      </div>
    );
  } else if (statusToLower === TESTING) {
    return (
      <div className='flex h-12 w-full items-center justify-center rounded bg-secondary-1 text-3xl text-white'>
        <ImLab />
      </div>
    );
  }

  return <></>;
};

export default MissionStatus;
