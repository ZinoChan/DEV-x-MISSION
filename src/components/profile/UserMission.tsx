import { ROUTES } from '@/utils/routes';
import EditBtns from './EditBtns';
import Link from 'next/link';
import { MdOutlineUnpublished, MdPublishedWithChanges } from 'react-icons/md';

type Props = {
  missionName: string;
  id: string;
  published: boolean;
};

const UserMission = ({ missionName, id, published }: Props) => {
  return (
    <div className='relative flex min-h-[220px] items-center justify-center rounded border border-gray-2 bg-gradient-to-b from-[#F4F6F0] to-[#eee] p-8 text-center shadow'>
      <div className='absolute right-4 top-4'>
        <EditBtns mission_slug={id} />
      </div>
      <div className='absolute left-4 top-4 text-2xl'>
        <div className='group relative'>
          <span
            className={`${
              published ? 'bg-lime-200' : 'bg-yellow-200'
            } absolute left-0 top-[-135%] -translate-x-1/3 rounded px-3 py-0 text-[10px]  font-semibold text-dark-1 opacity-0 transition-all duration-200 ease-linear group-hover:top-[-130%]  group-hover:opacity-100`}
          >
            {published ? 'published' : 'unpublished'}
          </span>
          {!published ? (
            <MdOutlineUnpublished className='text-yellow-500' />
          ) : (
            <MdPublishedWithChanges className='text-green-500' />
          )}
        </div>
      </div>
      <Link href={`${ROUTES.USER_PROFILE}/mission-slug`}>
        <h3 className='text-4xl hover:text-primary-2'>
          Mission: {missionName}
        </h3>
      </Link>
    </div>
  );
};

export default UserMission;
