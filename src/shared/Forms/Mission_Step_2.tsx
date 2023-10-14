import { initialMarkdown, skillRequired } from '@/data';
import { Step_2_FormValues } from '@/types/mission.types';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import Select from 'react-select';

type Props = {
  control: Control<Step_2_FormValues>;
  errors: FieldErrors<Step_2_FormValues> | undefined;
  setMarkdown: (md: string) => void;
};

const Mission_Step_2 = ({ control, errors, setMarkdown }: Props) => {
  return (
    <>
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
        {errors && errors['skillRequired'] && (
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
        {errors && errors['missionDetails'] && (
          <span className='text-sm text-red-500'>
            {errors['missionDetails'].message}
          </span>
        )}
      </div>
    </>
  );
};

export default Mission_Step_2;
