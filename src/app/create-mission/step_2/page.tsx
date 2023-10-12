'use client';
import PreviewMd from '@/components/missions/PreviewMd';
import { initialMarkdown, skillRequired } from '@/data';
import BackBtn from '@/shared/BackBtn';
import { Step_2_FormValues } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import { create_mission_schema_2 } from '@/utils/validation/mission_validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

const initialValues = {
  skillRequired: [],
  missionDetails: '',
};

const CreateMissionStep_2 = () => {
  const [markdown, setMarkdown] = useState('');
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Step_2_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(create_mission_schema_2),
  });

  const onSubmit = (data: Step_2_FormValues) => {
    const skillValues = data.skillRequired.map((item) => item.value);
    const formData = {
      ...data,
      skillRequired: skillValues,
    };
    console.log(formData);
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      <div className={`${isPreviewOpen ? 'flex' : 'hidden'}`}>
        <PreviewMd markdown={markdown} setPreviewOpen={setPreviewOpen} />
      </div>
      <BackBtn link={ROUTES.CREATE_MISSION_STEP_1} />
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          mission #1: Anime recommendation app
        </h1>
        <p className='text-sm text-gray-4'>web development</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 rounded bg-light-2 p-8 shadow-md'>
          <div className='mb-4'>
            <label
              htmlFor='skill required'
              className='mb-2 block text-sm font-medium text-dark-1'
            >
              Skill Required
            </label>
            <Controller
              name='skillRequired'
              control={control}
              render={({ field }) => (
                <Select
                  id='skillRequired'
                  instanceId='uniquesId_01'
                  options={skillRequired}
                  isMulti
                  name='skillRequired'
                  className='block w-full border border-gray-5 bg-white p-2.5 text-sm text-dark-1 outline-none focus:border-primary-1 focus:ring-primary-1'
                  placeholder='required skills'
                  classNamePrefix='select'
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors['skillRequired'] && (
              <span className='text-sm text-red-500'>
                {errors['skillRequired'].message}
              </span>
            )}
          </div>
          <div className='mt-6'>
            <label
              htmlFor='mission-objective'
              className='mb-2 block text-sm font-medium text-dark-1'
            >
              Mission Details:
            </label>
            <Controller
              name='missionDetails'
              control={control}
              render={({ field }) => (
                <textarea
                  id='mission-details'
                  className='block w-full border border-gray-5 bg-white p-2.5 text-sm text-dark-1 outline-none  placeholder:text-gray-3 focus:border-primary-1 focus:ring-primary-1'
                  placeholder={initialMarkdown}
                  rows={20}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setMarkdown(e.target.value);
                  }}
                ></textarea>
              )}
            />
            {errors['missionDetails'] && (
              <span className='text-sm text-red-500'>
                {errors['missionDetails'].message}
              </span>
            )}
          </div>
        </div>
        <div className='flex items-center justify-end space-x-2'>
          <button className='rounded border-2 border-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all hover:bg-primary-1/90'>
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

export default CreateMissionStep_2;
