'use client';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Link from 'next/link';
import UserMission from '@/components/profile/UserMission';
import { ROUTES } from '@/utils/routes';
import Select from 'react-select';
import { userMissionFilter } from '@/data';
import { useEffect, useState } from 'react';
import { TUserMission, UserMissionRes } from '@/types/mission.types';
import { filterMissions } from '@/helpers/filterMission';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/utils/HttpRequest';
import { USER_ENDPOINT } from '@/constants/apiEndpoints';
import LoadingOverlay from '@/shared/LoadingOverlay';

type selectOption = {
  label: string;
  value: string;
};

const MissionList = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    userMissionFilter[0].value
  );

  const { isLoading, isError, data } = useQuery({
    queryKey: ['userMissions'],
    queryFn: async () => {
      const data = await httpRequest<UserMissionRes>(
        'get',
        `${USER_ENDPOINT}/missions`
      );
      return data;
    },
  });

  const [filteredMissions, setFilteredMissions] = useState<TUserMission[]>([]);

  const handleFilterChange = (selectedOption: selectOption | null) => {
    setSelectedFilter(selectedOption ? selectedOption.value : null);
  };
  useEffect(() => {
    setFilteredMissions(
      filterMissions(data?.userMissions || [], selectedFilter)
    );
  }, [data, selectedFilter]);

  return (
    <section className='pb-6'>
      {isLoading && <LoadingOverlay />}
      {data && data?.userMissions.length > 0 && (
        <div className='mb-4 flex justify-end'>
          <Select
            className='w-40'
            classNamePrefix='select'
            defaultValue={userMissionFilter[0]}
            onChange={handleFilterChange}
            isClearable
            isSearchable
            name='filter'
            placeholder='Filter...'
            options={userMissionFilter}
          />
        </div>
      )}
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='flex border-spacing-3 items-center justify-center rounded border-[3px] border-dashed border-gray-2 p-8'>
          <div className='flex flex-col items-center justify-center text-center'>
            <AiOutlinePlusCircle className='text-5xl text-primary-1' />
            <p className='my-4 text-sm text-gray-4'>
              Launch your mission, attract collaborators, and navigate through
              development together.
            </p>
            <Link
              href={ROUTES.CREATE_MISSION_STEP_1}
              className='rounded-md bg-dark-1  px-4 py-2 text-white  transition-colors hover:bg-dark-1/80'
            >
              Add new mission
            </Link>
          </div>
        </div>
        {filteredMissions.length > 0 &&
          filteredMissions.map(({ missionName, id, published }) => (
            <UserMission
              key={id}
              missionName={missionName}
              published={published}
              id={id}
            />
          ))}
        {filteredMissions.length == 0 && <div>No mission found</div>}
        {isError && <div className='col-span-2'>Error while fetching data</div>}
      </div>
    </section>
  );
};

export default MissionList;
