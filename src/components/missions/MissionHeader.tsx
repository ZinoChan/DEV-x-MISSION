'use client';
import Container from '@/shared/Container';
import Filter from './Filter';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import { DangerBtn } from '@/shared/Button/Btns';

const MissionHeader = ({ isFilterEmpty }: { isFilterEmpty: boolean }) => {
  const [isFilterOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState('?');
  const router = useRouter();
  const clearFilter = () => {
    setQuery('?');
    router.push(ROUTES.MISSIONS);
  };
  return (
    <>
      <Container>
        <div className='mb-10 flex items-center justify-between'>
          <Link
            href={ROUTES.CREATE_MISSION_STEP_1}
            className='flex items-center space-x-2 rounded bg-primary-1 px-5 py-2.5 text-center text-sm font-bold capitalize text-dark-1 shadow-md shadow-primary-1/50 transition-all hover:bg-primary-1/90 hover:shadow-lg focus:ring focus:ring-lime-400'
          >
            <span>create mission</span>
            <AiOutlinePlusCircle className='text-xl' />
          </Link>
          <div className='flex items-center space-x-4'>
            {isFilterEmpty == false && (
              <DangerBtn onClick={clearFilter} className='rounded-full'>
                clear filter
              </DangerBtn>
            )}
            <button
              onClick={() => setFiltersOpen(!isFilterOpen)}
              className='flex items-center space-x-2 rounded-full border  border-gray-4 px-4 py-1.5 text-center text-sm font-bold capitalize text-gray-4 transition-colors hover:bg-gray-4 hover:text-white'
            >
              <span>filter</span>
              <BsFilter className='text-xl' />
            </button>
          </div>
        </div>
      </Container>
      <div
        className={` overflow-hidden bg-light-2 transition-all duration-300 ${
          isFilterOpen ? 'max-h-full py-5 lg:max-h-[220px]' : 'max-h-0 py-0'
        }`}
      >
        <Container>
          <Filter setQuery={setQuery} query={query} />
        </Container>
      </div>
    </>
  );
};

export default MissionHeader;
