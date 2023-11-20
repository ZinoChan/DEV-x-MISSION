import { USER_ENDPOINT } from '@/constants/apiEndpoints';
import getQueryClient from '@/lib/getQueryClient';
import LoadingOverlay from '@/shared/LoadingOverlay';
import { MissionRes } from '@/types/mission.types';
import { httpClient } from '@/services/httpClient';
import { ROUTES } from '@/utils/routes';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';

type Props = {
  missionId: string;
  setFilterId?: (id: string) => void;
};

const EditBtns = ({ missionId, setFilterId }: Props) => {
  const mutation = useMutation({
    mutationFn: (missionId: string) => {
      return httpClient<MissionRes>(
        'delete',
        `${USER_ENDPOINT}/missions/${missionId}`
      );
    },
    onSuccess: (data) => {
      getQueryClient().invalidateQueries({ queryKey: ['userMissions'] });
      toast.success('mission delete');
      if (setFilterId) setFilterId(data.mission.id);
    },
  });

  const handleDeleteMission = () => {
    mutation.mutate(missionId);
  };

  return (
    <div className='flex items-baseline space-x-3'>
      {mutation.isLoading && <LoadingOverlay />}
      <Link
        href={`${ROUTES.USER_PROFILE}/${missionId}/edit-mission/step_1`}
        className='text-secondary-3 hover:text-purple-500'
      >
        <BiEdit className='text-xl' />
      </Link>
      <button
        onClick={handleDeleteMission}
        className='text-red-500 hover:text-red-400'
      >
        <BiTrash className='text-xl' />
      </button>
    </div>
  );
};

export default EditBtns;
