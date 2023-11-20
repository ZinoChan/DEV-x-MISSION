'use client';
import PreviewMd from '@/components/missions/PreviewMd';
import Mission_Step_2 from '@/shared/Forms/Mission_Step_2';
import { Step_2_FormValues } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import { create_mission_schema_2 } from '@/utils/validation/mission_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Mission } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/services/httpClient';
import { MissionRes } from '@/types/mission.types';
import { USER_ENDPOINT } from '@/constants/apiEndpoints';
import toast from 'react-hot-toast';
import LoadingOverlay from '@/shared/LoadingOverlay';
import { MutationData } from '@/app/create-mission/step_2/MissionFormStep2';

type Props = {
  mission: Mission & {
    skillsRequired: {
      id: string;
      name: string;
      missionId: string;
    }[];
  };
};

const EditFormStep2 = ({ mission }: Props) => {
  const [markdown, setMarkdown] = useState(mission.missionDetails ?? '');
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isRedirecting, setRedirecting] = useState(false);

  const defaultValues = {
    skillRequired: mission.skillsRequired.map((skill) => ({
      label: skill.name,
      value: skill.name,
    })),
    missionDetails: mission.missionDetails ?? '',
  };

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<Step_2_FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(create_mission_schema_2),
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (updateMission: MutationData) => {
      return httpClient<MissionRes>(
        'put',
        `${USER_ENDPOINT}/missions/${mission.id}`,
        updateMission
      );
    },
    onSuccess: (data) => {
      router.push(
        `${ROUTES.USER_PROFILE}/${data.mission.id}/${ROUTES.EDIT_MISSION_STEP_3}`
      );
      toast.success('Edit success !');
      setRedirecting(true);
      toast('Moving on to final step', {
        icon: '🔀',
      });
    },
  });
  const onSubmit = (data: Step_2_FormValues) => {
    const skillValues = data.skillRequired.map((item) => item.value);
    const formData = {
      ...data,
      skillRequired: skillValues,
    };
    const isDataChanged =
      JSON.stringify(defaultValues) !== JSON.stringify(data);
    if (isDataChanged) {
      mutation.mutate(formData);
    } else {
      router.push(
        `${ROUTES.USER_PROFILE}/${mission.id}/${ROUTES.EDIT_MISSION_STEP_3}`
      );
    }
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      {isRedirecting && <LoadingOverlay />}
      {mutation.isLoading && <LoadingOverlay />}
      <div className={`${isPreviewOpen ? 'flex' : 'hidden'}`}>
        <PreviewMd markdown={markdown} setPreviewOpen={setPreviewOpen} />
      </div>
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          mission #{mission.missionOrder}: {mission.missionName}
        </h1>
        <p className='text-sm text-gray-4'>{mission.missionType}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 rounded bg-light-2 p-8 shadow-md'>
          <Mission_Step_2
            errors={errors}
            control={control}
            setMarkdown={setMarkdown}
          />
        </div>
        <div className='flex items-center justify-end space-x-2'>
          <button
            type='button'
            onClick={() => setPreviewOpen(!isPreviewOpen)}
            className='rounded border-2 border-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all hover:bg-primary-1/90'
          >
            Preview
          </button>
          <button
            type='submit'
            className={`rounded border-2 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all ${
              isValid
                ? 'border-primary-1 hover:bg-primary-1/90'
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
export default EditFormStep2;
