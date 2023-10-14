'use client';
import AddLink from '@/components/missions/AddLink';
import { communityLinks } from '@/data';
import BackBtn from '@/shared/BackBtn';
import { ROUTES } from '@/utils/routes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CommunityLink, Step_3_FormValues } from '@/types/mission.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_3 } from '@/utils/validation/mission_validation';
import Mission_Step_3 from '@/shared/Forms/Mission_Step_3';

const CreateMissionStep_3 = () => {
  const [isAddLinkOpen, setAddLinkOpen] = useState(false);
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
  };
  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      <BackBtn link={ROUTES.MISSIONS} />
      <div className='mb-10 text-center'>
        <h1 className='mb-3 text-5xl text-dark-1 sm:text-6xl'>
          Add community links
        </h1>
        <p className='mx-auto max-w-sm text-sm text-gray-4'>
          In a compelling revelation, 70% of our covert operatives, the spies,
          have expressed a clear preference towards Discord as their
          communication channel of choice
        </p>
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
          <button className='rounded border-2 border-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 transition-all hover:bg-primary-1/90'>
            Save Draft
          </button>
          <button className='rounded border-2 bg-primary-1 px-4 py-2 text-center text-sm font-bold text-dark-1 shadow-sm shadow-primary-1/50 hover:bg-primary-1/70 md:w-auto'>
            Publish
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateMissionStep_3;
