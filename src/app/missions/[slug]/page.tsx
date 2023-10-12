import { fakeMission } from '@/data';
import BackBtn from '@/shared/BackBtn';
import { ROUTES } from '@/utils/routes';
import Markdown from 'react-markdown';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactionBtns from '@/components/missionDetails/ReactionBtns';
import CommentsList from '@/components/missionDetails/CommentsList';
import { CommentsContextProvider } from '@/context/comments';

const MissionDetail = () => {
  return (
    <CommentsContextProvider>
      <section className='pt-10 '>
        <CommentsList />
        <div className='mx-auto max-w-screen-md px-4 py-20 sm:px-6 lg:px-8'>
          <BackBtn link={ROUTES.MISSIONS} />
          <h1 className='my-6 text-3xl tracking-wider md:text-6xl'>
            Mission: colony on mars for anime lovers
          </h1>
          <div className='mb-6 flex items-center space-x-3'>
            <span className='rounded-full bg-green-300 px-3 py-1 text-sm font-bold capitalize'>
              junior
            </span>
          </div>

          <div className='flex flex-col justify-between space-y-4 border-b border-b-gray-200 py-4 text-sm text-gray-4  sm:flex-row sm:items-center sm:space-y-0'>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-3'>
                <div className='h-10 w-10  rounded-full bg-gray-300'></div>
                <p className='text-sm font-bold capitalize text-dark-1'>
                  zino chan
                </p>
              </div>
              <p className='text-xs font-medium'>2 minutes read</p>
            </div>
            <ReactionBtns />
          </div>
          <div className='prose mb-6'>
            <Markdown>{fakeMission}</Markdown>
          </div>
          <ReactionBtns />
        </div>
        <div className='bg-light-2 py-20'>
          <div className='mx-auto max-w-screen-md px-2'>
            <div className='mb-20 flex flex-col items-center justify-between space-y-6 sm:flex-row sm:space-y-0'>
              <div className='flex flex-col items-center space-x-6 space-y-2 sm:flex-row sm:space-y-0'>
                <div className='h-16 w-16  rounded-full bg-gray-300'></div>
                <div className='text-center sm:text-left'>
                  <p className='font-bold capitalize text-dark-1'>zino chan</p>
                  <p className='text-sm capitalize text-dark-1'>
                    A Software engineer loves to build project for fun
                  </p>
                </div>
              </div>
              <button className='flex items-center space-x-1 rounded-full bg-green-500 px-6 py-2 font-bold capitalize text-white hover:bg-green-400'>
                <AiOutlinePlus />
                <span>follow</span>
              </button>
            </div>
            <BackBtn link={ROUTES.MISSIONS} />
          </div>
        </div>
      </section>
    </CommentsContextProvider>
  );
};

export default MissionDetail;
