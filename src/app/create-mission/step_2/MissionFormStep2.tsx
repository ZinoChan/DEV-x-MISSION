'use client';
import PreviewMd from '@/components/missions/PreviewMd';
import { initialValues_2 } from '@/data';
import BackBtn from '@/shared/BackBtn';
import Mission_Step_2 from '@/shared/Forms/Mission_Step_2';
import { MissionRes, Step_2_FormValues } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import { create_mission_schema_2 } from '@/utils/validation/mission_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mission } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { getErrorMessage } from '@/utils/ErrHandling/GetErrMsg';
import LoadingOverlay from '@/shared/LoadingOverlay';
import { httpRequest } from '@/utils/HttpRequest';
import { USER_ENDPOINT } from '@/constants/apiEndpoints';
import { DraftBtn, SubmitBtn } from '@/shared/Button/MissionBtns';
import toast from 'react-hot-toast';

export type MutationData = {
  missionDetails: string;
  skillRequired: string[];
};

const MissionFormStep2 = ({ mission }: { mission: Mission }) => {
  const [markdown, setMarkdown] = useState('');
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();
  const [isRedirecting, setRedirecting] = useState(false);
  const [isSaveDraft, setSaveAsDraft] = useState(false);

  const {
    handleSubmit,
    trigger,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Step_2_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues_2,
    resolver: yupResolver(create_mission_schema_2),
  });

  const mutation = useMutation({
    mutationFn: (updateMission: MutationData) => {
      return httpRequest<MissionRes>(
        'put',
        `${USER_ENDPOINT}/missions/${mission.id}`,
        updateMission
      );
    },
    onSuccess: (data) => {
      if (isSaveDraft) {
        router.push(ROUTES.USER_PROFILE), toast.success('Changes Saved!');
        setRedirecting(true);
      } else {
        router.push(`${ROUTES.CREATE_MISSION_STEP_3}/${data.mission.id}`),
          toast.success('Step 2 Complete!');
        setRedirecting(true);
        toast('Moving on to final step', {
          icon: '🔀',
        });
      }
    },
  });

  const onSubmit = (data: Step_2_FormValues) => {
    const skillValues = data.skillRequired.map((item) => item.value);
    const formData = {
      ...data,
      skillRequired: skillValues,
    };
    mutation.mutate(formData);
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
          <DraftBtn
            saveAsDraft={saveAsDraft}
            isDirty={isDirty}
            isValid={isValid}
            label='save draft'
          />
          <button
            type='button'
            onClick={() => setPreviewOpen(!isPreviewOpen)}
            className='rounded border-2 border-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all hover:bg-primary-1/90'
          >
            Preview
          </button>
          <SubmitBtn isDirty={isDirty} isValid={isValid} label='next step' />
        </div>
      </form>
    </section>
  );
};

export default MissionFormStep2;
