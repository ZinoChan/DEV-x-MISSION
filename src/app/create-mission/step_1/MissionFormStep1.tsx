'use client';
import { useForm } from 'react-hook-form';
import BackBtn from '@/shared/BackBtn';
import { ROUTES } from '@/utils/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_1 } from '@/utils/validation/mission_validation';
import { Step_1_FormValues } from '@/types/mission.types';
import { useRouter } from 'next/navigation';
import Mission_Step_1 from '@/shared/Forms/Mission_Step_1';
import { initialValues_1 } from '@/data';
import toast from 'react-hot-toast';

const MissionFormStep1 = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<Step_1_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues_1,
    resolver: yupResolver(create_mission_schema_1),
  });

  const onSubmit = async (data: Step_1_FormValues) => {
    try {
      const res = await fetch('/api/missions', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await res.json();
      if (res.status !== 201)
        throw new Error(
          response.message != null ? response.message : 'error accured'
        );
      if (res.status == 201) router.push(ROUTES.CREATE_MISSION_STEP_2);
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        toast.error(
          error.message.length > 0 ? error.message : 'failed to create mission'
        );
      else {
        console.log(error);
        toast.error('an error accured');
      }
    }
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
          <Mission_Step_1 control={control} errors={errors} />
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

export default MissionFormStep1;
