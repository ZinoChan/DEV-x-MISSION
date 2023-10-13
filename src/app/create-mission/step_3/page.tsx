'use client';
import AddLink from '@/components/missions/AddLink';
import { communityLinks } from '@/data';
import BackBtn from '@/shared/BackBtn';
import { ROUTES } from '@/utils/routes';
import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { CommunityLink } from '@/types/mission.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_3 } from '@/utils/validation/mission_validation';

type FormData = {
  [k: string]: string;
};

const CreateMissionStep_3 = () => {
  const [isAddLinkOpen, setAddLinkOpen] = useState(false);
  const [community_links, setCommunityLinks] =
    useState<CommunityLink[]>(communityLinks);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(create_mission_schema_3),
  });
  const isError = Object.keys(errors).length > 0;
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      <AddLink
        community_links={community_links}
        setCommunityLinks={setCommunityLinks}
        isOpen={isAddLinkOpen}
        setOpen={setAddLinkOpen}
      />
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4  rounded bg-light-2 p-8 shadow-md'>
          {isError && (
            <div className='mt-1 text-center text-red-500'>
              <span>At least one community link is required</span>
            </div>
          )}
          <div className='mx-auto mb-6 grid max-w-md gap-y-5'>
            {community_links.map((link, index) => (
              <div key={index}>
                <label
                  htmlFor={`mission-name-${index}`}
                  className='mb-2 block text-sm font-medium text-dark-1'
                >
                  {link.name}
                </label>
                <input
                  id={link.name}
                  type='text'
                  placeholder='www.example.com'
                  className={`${
                    isError && 'border-red-500'
                  } block w-full border border-gray-5 bg-white p-2.5 text-sm text-gray-3  outline-none focus:border-primary-1 focus:ring-primary-1`}
                  {...register(link.name)}
                />
              </div>
            ))}
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={() => setAddLinkOpen(true)}
                className='rounded bg-secondary-3 p-2 text-xl text-white shadow-md shadow-secondary-3/60 hover:bg-secondary-3/70'
              >
                <AiOutlinePlusCircle className='text-xl' />
              </button>
            </div>
          </div>
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
