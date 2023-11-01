'use client';
import { useForm } from 'react-hook-form';
import { ROUTES } from '@/utils/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_1 } from '@/utils/validation/mission_validation';
import { Step_1_FormValues } from '@/types/mission.types';
import { useRouter } from 'next/navigation';
import Mission_Step_1 from '@/shared/Forms/Mission_Step_1';
import { Mission } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { httpRequest } from '@/utils/HttpRequest';
import { MissionRes } from '@/types/mission.types';
import { USER_ENDPOINT } from '@/constants/apiEndpoints';
import toast from 'react-hot-toast';
import { useState } from 'react';
import LoadingOverlay from '@/shared/LoadingOverlay';

const EditFormStep1 = ({ mission }: { mission: Mission }) => {
  const defaultValues = {
    missionName: mission.missionName,
    skillLevel: mission.skillLevel,
    missionType: mission.missionType,
    missionStatus: mission.missionStatus,
    missionObjective: mission.missionObjective,
  };
  const [isRedirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<Step_1_FormValues>({
    defaultValues,
    resolver: yupResolver(create_mission_schema_1),
  });
  const mutation = useMutation({
    mutationFn: (newMission: Step_1_FormValues) => {
      return httpRequest<MissionRes>(
        'put',
        `${USER_ENDPOINT}/missions/${mission.id}`,
        newMission
      );
    },
    onSuccess: (data) => {
      router.push(
        `${ROUTES.USER_PROFILE}/${data.mission.id}/${ROUTES.EDIT_MISSION_STEP_2}`
      ),
        toast.success('Misson Edited !');
      setRedirecting(true);
      toast('Moving on to Step 2', {
        icon: '🔀',
      });
    },
  });

  const onSubmit = (data: Step_1_FormValues) => {
    const isDataChanged =
      JSON.stringify(defaultValues) !== JSON.stringify(data);
    if (isDataChanged) {
      mutation.mutate(data);
    } else {
      router.push(
        `${ROUTES.USER_PROFILE}/${mission.id}/${ROUTES.EDIT_MISSION_STEP_2}`
      );
    }
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      {isRedirecting && <LoadingOverlay />}
      {mutation.isLoading && <LoadingOverlay />}
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          Edit mission #{mission.missionOrder}: {mission.missionName}
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 grid grid-cols-1 gap-4 gap-y-5 rounded bg-light-2 p-8 shadow-md sm:grid-cols-2 md:gap-x-10'>
          <Mission_Step_1 control={control} errors={errors} />
        </div>
        <div className='flex items-center justify-end space-x-2'>
          <button
            type='submit'
            className={`rounded border-2 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all ${
              isValid
                ? 'border-primary-1 bg-primary-1 hover:bg-primary-1/90'
                : 'cursor-not-allowed border-gray-5 text-gray-3'
            }`}
          >
            Next Step
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditFormStep1;
