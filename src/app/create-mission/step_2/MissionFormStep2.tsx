'use client';
import PreviewMd from '@/components/missions/PreviewMd';
import { initialValues_2 } from '@/data';
import BackBtn from '@/shared/BackBtn';
import Mission_Step_2 from '@/shared/Forms/Mission_Step_2';
import { Step_2_FormValues } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import { create_mission_schema_2 } from '@/utils/validation/mission_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mission } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getErrorMessage } from '@/utils/ErrHandling/GetErrMsg';
import LoadingOverlay from '@/shared/LoadingOverlay';

type MutationData = {
  missionDetails: string;
  skillRequired: string[];
};

const MissionFormStep2 = ({ mission }: { mission: Mission }) => {
  const [markdown, setMarkdown] = useState('');
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Step_2_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues_2,
    resolver: yupResolver(create_mission_schema_2),
  });

  const mutation = useMutation({
    mutationFn: (updateMission: MutationData) => {
      return axios.put(`/api/missions/${mission.id}`, updateMission);
    },
    onSuccess: (resData) =>
      router.push(`${ROUTES.CREATE_MISSION_STEP_3}/${resData.data.mission.id}`),
  });

  const onSubmit = (data: Step_2_FormValues) => {
    const skillValues = data.skillRequired.map((item) => item.value);
    const formData = {
      ...data,
      skillRequired: skillValues,
    };
    mutation.mutate(formData);
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      {mutation.isLoading && <LoadingOverlay />}
      <div className={`${isPreviewOpen ? 'flex' : 'hidden'}`}>
        <PreviewMd markdown={markdown} setPreviewOpen={setPreviewOpen} />
      </div>
      <BackBtn link={ROUTES.MISSIONS} />
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          mission: {mission.missionName}
        </h1>
        <p className='text-sm text-gray-4'>{mission.missionType}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mutation.isError ? (
          <div className='mb-2 rounded  border-2 border-red-500 bg-red-200 p-6 text-center text-red-500'>
            {getErrorMessage(mutation.error)}
          </div>
        ) : null}
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
            className={`rounded border-2 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all ${
              isDirty && isValid
                ? 'border-primary-1 hover:bg-primary-1/90'
                : 'cursor-not-allowed border-gray-5 text-gray-3'
            }`}
          >
            Save Draft
          </button>
          <button
            type='button'
            onClick={() => setPreviewOpen(!isPreviewOpen)}
            className='rounded border-2 border-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all hover:bg-primary-1/90'
          >
            Preview
          </button>
          <button
            type='submit'
            className={`rounded border-2  px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all ${
              isDirty && isValid
                ? 'bg-primary-1 shadow-primary-1/50 transition-all hover:bg-primary-1/90  hover:shadow-lg focus:ring focus:ring-lime-400'
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

export default MissionFormStep2;
