'use client';
import InputField from '@/shared/InputField';
import TextareaField from '@/shared/TextareaField';
import { Edit_Profile_FormValues } from '@/types/profile.types';
import { useForm } from 'react-hook-form';

const initialValues = {
  location: '',
  about: '',
};

const EditProfile = () => {
  const { handleSubmit, control } = useForm<Edit_Profile_FormValues>({
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const onSubmit = (data: Edit_Profile_FormValues) => console.log(data);
  return (
    <section className='py-4'>
      <div className='mx-auto max-w-md'>
        <h4 className='mb-6 text-center text-3xl text-dark-1 '>Edit Profile</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            type='text'
            label='location'
            name='location'
            error={undefined}
          />
          <div className='my-6'>
            <TextareaField
              control={control}
              rows={6}
              label='about'
              name='about'
              error={undefined}
            />
          </div>
          <button
            type='submit'
            className='rounded bg-primary-2 px-4 py-2 text-center text-sm font-bold text-white shadow-sm shadow-primary-2/50 hover:bg-primary-2/70 md:w-auto'
          >
            submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
