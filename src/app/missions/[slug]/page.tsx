import BackBtn from '@/shared/BackBtn';
import { ROUTES } from '@/utils/routes';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactionBtns from '@/components/missionDetails/ReactionBtns';
import CommentsList from '@/components/missionDetails/CommentsList';
import { CommentsContextProvider } from '@/context/comments';
import Post from '@/shared/Post';

const MissionDetail = () => {
  return (
    <CommentsContextProvider>
      <section className='pt-10 '>
        <CommentsList />
        <div className='mx-auto max-w-screen-md px-4 py-20 sm:px-6 lg:px-8'>
          <BackBtn link={ROUTES.MISSIONS} />
          <Post reactionBtns />
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
