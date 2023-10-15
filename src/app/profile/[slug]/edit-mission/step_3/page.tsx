'use client';
import AddLink from '@/components/missions/AddLink';
import { communityLinks } from '@/data';
import { ROUTES } from '@/utils/routes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CommunityLink, Step_3_FormValues } from '@/types/mission.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_3 } from '@/utils/validation/mission_validation';
import Mission_Step_3 from '@/shared/Forms/Mission_Step_3';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CreateMissionStep_3 = () => {
  const [isAddLinkOpen, setAddLinkOpen] = useState(false);
  const router = useRouter();
  const [community_links, setCommunityLinks] =
    useState<CommunityLink[]>(communityLinks);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Step_3_FormValues>({
    defaultValues: {},
    resolver: yupResolver(create_mission_schema_3),
  });
  const onSubmit = (data: Step_3_FormValues) => {
    console.log(data);
    toast.success('mission edit successfully');
    router.push(ROUTES.USER_PROFILE);
  };
  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          community links
        </h1>
      </div>
      <AddLink
        community_links={community_links}
        setCommunityLinks={setCommunityLinks}
        isOpen={isAddLinkOpen}
        setOpen={setAddLinkOpen}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4  rounded bg-light-2 p-8 shadow-md'>
          <Mission_Step_3
            register={register}
            errors={errors}
            setAddLinkOpen={setAddLinkOpen}
            links={community_links}
          />
        </div>
        <div className='flex items-center justify-end space-x-2'>
          <button
            type='submit'
            className='rounded border-2 bg-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 shadow-sm shadow-primary-1/50 hover:bg-primary-1/70 md:w-auto'
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateMissionStep_3;
