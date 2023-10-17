import { Step_1_FormValues } from '@/types/mission.types';
import { Control, FieldErrors } from 'react-hook-form';
import InputField from '../InputField';
import SelectInput from '../SelectInput';
import TextareaField from '../TextareaField';
import { projectStatus, projectTypes, skillLevels } from '@/data';

type Props = {
  control: Control<Step_1_FormValues>;
  errors: FieldErrors<Step_1_FormValues> | undefined;
};

const Mission_Step_1 = ({ control, errors }: Props) => {
  return (
    <>
      <InputField
        label='Mission name'
        name='missionName'
        control={control}
        error={errors && errors['missionName']}
        type='text'
      />
      <SelectInput
        label='Skill Level'
        options={skillLevels}
        name='skillLevel'
        control={control}
        error={errors && errors['skillLevel']}
      />
      <SelectInput
        label='Mission Type'
        options={projectTypes}
        name='missionType'
        control={control}
        error={errors && errors['missionType']}
      />
      <SelectInput
        label='Status'
        options={projectStatus}
        name='missionStatus'
        control={control}
        error={errors && errors['missionStatus']}
      />
      <div className='sm:col-span-2'>
        <TextareaField
          label='Mission objective:'
          control={control}
          rows={6}
          name='missionObjective'
          error={errors && errors['missionObjective']}
        />
      </div>
    </>
  );
};

export default Mission_Step_1;
