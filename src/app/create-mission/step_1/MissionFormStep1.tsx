'use client';
import { useForm } from 'react-hook-form';
import BackBtn from '@/shared/Button/BackBtn';
import { ROUTES } from '@/utils/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_1 } from '@/utils/validation/mission_validation';
import { MissionRes, Step_1_FormValues } from '@/types/mission.types';
import { useRouter } from 'next/navigation';
import Mission_Step_1 from '@/shared/Forms/Mission_Step_1';
import { initialValues_1 } from '@/data';
import { useMutation } from '@tanstack/react-query';
import { getErrorMessage } from '@/utils/ErrHandling/GetErrMsg';
import LoadingOverlay from '@/shared/LoadingOverlay';
import { httpClient } from '@/services/httpClient';
import { USER_ENDPOINT } from '@/constants/apiEndpoints';
import { DraftBtn, SubmitBtn } from '@/shared/Button/MissionBtns';
import { useState } from 'react';
import toast from 'react-hot-toast';

const MissionFormStep1 = () => {
  const router = useRouter();
  const [isRedirecting, setRedirecting] = useState(false);
  const [isSaveDraft, setSaveAsDraft] = useState(false);
  const {
    handleSubmit,
    trigger,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Step_1_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues_1,
    resolver: yupResolver(create_mission_schema_1),
  });

  const mutation = useMutation({
    mutationFn: (newMission: Step_1_FormValues) => {
      return httpClient<MissionRes>(
        'post',
        `${USER_ENDPOINT}/missions`,
        newMission
      );
    },
    onSuccess: (data) => {
      if (isSaveDraft) {
        router.push(ROUTES.USER_PROFILE), toast.success('Changes Saved!');
        setRedirecting(true);
      } else {
        router.push(`${ROUTES.CREATE_MISSION_STEP_2}/${data.mission.id}`),
          toast.success('Step 1 Complete!');
        setRedirecting(true);
        toast('Moving on to Step 2', {
          icon: '🔀',
        });
      }
    },
  });

  const onSubmit = (data: Step_1_FormValues) => {
    mutation.mutate(data);
  };

  const saveAsDraft = async () => {
    const isValidValues = await trigger();
    if (isValidValues) {
      setSaveAsDraft(true);
      handleSubmit(onSubmit)();
    }
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      {isRedirecting && <LoadingOverlay />}
      {mutation.isLoading && <LoadingOverlay />}
      <BackBtn link={ROUTES.MISSIONS} />
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          create your mission
        </h1>
        <p className='text-sm text-gray-4'>start building something amazing</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mutation.isError ? (
          <div className='mb-2 rounded  border-2 border-red-500 bg-red-200 p-6 text-center text-red-500'>
            {getErrorMessage(mutation.error)}
          </div>
        ) : null}
        <div className='mb-4 grid grid-cols-1 gap-4 gap-y-5 rounded bg-light-2 p-8 shadow-md sm:grid-cols-2 md:gap-x-10'>
          <Mission_Step_1 control={control} errors={errors} />
        </div>
        <div className='flex items-center justify-end space-x-2'>
          <DraftBtn
            saveAsDraft={saveAsDraft}
            isDirty={isDirty}
            isValid={isValid}
            label='save draft'
          />
          <SubmitBtn isDirty={isDirty} isValid={isValid} label='next step' />
        </div>
      </form>
    </section>
  );
};

export default MissionFormStep1;
