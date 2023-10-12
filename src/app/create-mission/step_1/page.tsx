'use client';
import { useForm, Controller } from 'react-hook-form';
import { projectTypes, skillLevels, projectStatus } from '@/data';
import BackBtn from '@/shared/BackBtn';
import { ROUTES } from '@/utils/routes';
import SelectInput from '@/shared/SelectInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_1 } from '@/utils/validation/mission_validation';
import { Step_1_FormValues } from '@/types/mission.types';

const initialValues = {
  missionName: '',
  skillLevel: '',
  projectType: '',
  status: '',
  missionObjective: '',
};

const CreateMissionStep_1 = () => {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Step_1_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(create_mission_schema_1),
  });

  const onSubmit = (data: Step_1_FormValues) => {
    console.log(data);
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      <BackBtn link={ROUTES.MISSIONS} />
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          create your mission
        </h1>
        <p className='text-sm text-gray-4'>start building something amazing</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 grid grid-cols-1 gap-4 gap-y-5 rounded bg-light-2 p-8 shadow-md sm:grid-cols-2 md:gap-x-10'>
          <div>
            <label
              htmlFor='mission-name'
              className='mb-2 block text-sm font-medium text-dark-1'
            >
              Mission Name:
            </label>
            <Controller
              name='missionName'
              control={control}
              render={({ field }) => (
                <input
                  id='mission-name'
                  type='text'
                  placeholder='Top-Secret Spy Mission Name'
                  className='block w-full border border-gray-5 bg-white p-2.5 text-sm text-dark-1 outline-none focus:border-primary-1 focus:ring-primary-1'
                  {...field}
                />
              )}
            />
            {errors['missionName'] && (
              <span className='text-sm text-red-500'>
                {errors['missionName'].message}
              </span>
            )}
          </div>
          <SelectInput
            label='Skill Level'
            options={skillLevels}
            name='skillLevel'
            control={control}
            error={errors['skillLevel']}
          />
          <SelectInput
            label='Project Type'
            options={projectTypes}
            name='projectType'
            control={control}
            error={errors['projectType']}
          />
          <SelectInput
            label='Status'
            options={projectStatus}
            name='projectStatus'
            control={control}
            error={errors['projectStatus']}
          />
          <div className='sm:col-span-2'>
            <label
              htmlFor='mission-objective'
              className='mb-2 block text-sm font-medium text-dark-1'
            >
              Mission Objective:
            </label>
            <Controller
              name='missionObjective'
              control={control}
              render={({ field }) => (
                <textarea
                  id='mission-objective'
                  className='block w-full border border-gray-5 bg-white p-2.5 text-sm text-dark-1 outline-none focus:border-primary-1 focus:ring-primary-1'
                  rows={6}
                  {...field}
                ></textarea>
              )}
            />
            {errors['missionObjective'] && (
              <span className='text-sm text-red-500'>
                {errors['missionObjective'].message}
              </span>
            )}
          </div>
        </div>
        <div className='flex items-center justify-end space-x-2'>
          <button
            type='submit'
            className={`rounded border-2 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all ${
              isDirty && isValid
                ? 'border-primary-1 hover:bg-primary-1/90'
                : 'cursor-not-allowed border-gray-5 text-gray-3'
            }`}
          >
            Save Draft
          </button>
          <button
            type='submit'
            className='rounded border-2 bg-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 shadow-sm shadow-primary-1/50 hover:bg-primary-1/70 md:w-auto'
          >
            Next Step
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateMissionStep_1;
