'use client';
import AddLink from '@/components/missions/AddLink';
import { communityLinks } from '@/data';
import BackBtn from '@/shared/Button/BackBtn';
import { ROUTES } from '@/utils/routes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CommunityLink,
  MissionRes,
  Step_3_FormValues,
} from '@/types/mission.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { create_mission_schema_3 } from '@/utils/validation/mission_validation';
import Mission_Step_3 from '@/shared/Forms/Mission_Step_3';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingOverlay from '@/shared/LoadingOverlay';
import { DraftBtn, SubmitBtn } from '@/shared/Button/MissionBtns';
import { httpClient } from '@/services/httpClient';
import { USER_ENDPOINT } from '@/constants/apiEndpoints';

const MissionFormStep3 = ({ missionId }: { missionId: string }) => {
  const router = useRouter();
  const [isAddLinkOpen, setAddLinkOpen] = useState(false);
  const [isRedirecting, setRedirecting] = useState(false);
  const [isSaveDraft, setSaveAsDraft] = useState(false);
  const [community_links, setCommunityLinks] =
    useState<CommunityLink[]>(communityLinks);

  const {
    handleSubmit,
    trigger,
    formState: { isDirty, isValid, errors },
    register,
  } = useForm<Step_3_FormValues>({
    defaultValues: {},
    resolver: yupResolver(create_mission_schema_3),
  });

  const mutation = useMutation({
    mutationFn: (updateMission: unknown) => {
      return httpClient<MissionRes>(
        'put',
        `${USER_ENDPOINT}/missions/${missionId}`,
        updateMission
      );
    },
    onSuccess: (data) => {
      if (isSaveDraft) {
        router.push(ROUTES.USER_PROFILE), toast.success('Changes Saved!');
        setRedirecting(true);
      } else {
        if (data.mission.published == true) toast.success('Mission Published');
        if (data.mission.published != true)
          toast('Mission saved as draft', { icon: '⚠️' });
        router.push(ROUTES.USER_PROFILE);
        setRedirecting(true);
      }
    },
  });

  const onSubmit = (data: Step_3_FormValues) => {
    const communityLinks = Object.entries(data)
      .filter(([key, value]) => key !== '' && value !== '')
      .map(([key, value]) => ({ name: key, url: value as string }));
    if (isSaveDraft) mutation.mutate(communityLinks);
    else mutation.mutate({ communityLinks, published: true });
  };
  const saveAsDraft = async () => {
    const isValidValues = await trigger();
    if (isValidValues) {
      setSaveAsDraft(true);
      handleSubmit(onSubmit)();
    }
  };

  return (
    <section className='mx-auto max-w-screen-md px-2 py-16'>
      {isRedirecting && <LoadingOverlay />}
      {mutation.isLoading && <LoadingOverlay />}
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
          <DraftBtn
            saveAsDraft={saveAsDraft}
            isDirty={isDirty}
            isValid={isValid}
            label='save draft'
          />
          <SubmitBtn isDirty={isDirty} isValid={isValid} label='publish' />
        </div>
      </form>
    </section>
  );
};

export default MissionFormStep3;
