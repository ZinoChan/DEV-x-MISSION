'use client';
import PreviewMd from '@/components/missions/PreviewMd';
import { initialValues_2 } from '@/data';
import Mission_Step_2 from '@/shared/Forms/Mission_Step_2';
import { Step_2_FormValues } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import { create_mission_schema_2 } from '@/utils/validation/mission_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const EditMissionStep_2 = () => {
  const [markdown, setMarkdown] = useState('');
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Step_2_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues_2,
    resolver: yupResolver(create_mission_schema_2),
  });
  const router = useRouter();

  const onSubmit = (data: Step_2_FormValues) => {
    const skillValues = data.skillRequired.map((item) => item.value);
    const formData = {
      ...data,
      skillRequired: skillValues,
    };
    console.log(formData);
    router.push(`${ROUTES.USER_PROFILE}/mission-slug/edit-mission/step_3`);
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      <div className={`${isPreviewOpen ? 'flex' : 'hidden'}`}>
        <PreviewMd markdown={markdown} setPreviewOpen={setPreviewOpen} />
      </div>
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          mission #1: Anime recommendation app
        </h1>
        <p className='text-sm text-gray-4'>web development</p>
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
              isDirty && isValid
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

export default EditMissionStep_2;
