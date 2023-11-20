import BackBtn from '@/shared/Button/BackBtn';
import { ROUTES } from '@/utils/routes';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactionBtns from '@/components/missionDetails/ReactionBtns';
import CommentsList from '@/components/missionDetails/CommentsList';
import { CommentsContextProvider } from '@/context/comments';
import Post from '@/shared/Post';
import { xprisma } from '@/lib/prismaExtentions';
import Avatar from '@/shared/Avatar';
import CommunityLinksList from '@/components/missionDetails/CommunityLinksList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/services/AuthOptions';

export default async function MissionDetail({
  params,
}: {
  params: { missionId: string };
}) {
  const { missionId } = params;

  const mission = await xprisma.mission.getMissionById(missionId);
  if (mission == null) return <div>mission not found</div>;

  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;
  let userId = '';
  if (currentUserEmail != null) {
    const user = await xprisma.user.findByEmail(currentUserEmail);
    if (user != null) userId = user.id;
  }

  return (
    <CommentsContextProvider>
      <section className='pt-10 '>
        <CommentsList missionId={mission.id} comments={mission.comments} />
        <div className='mx-auto max-w-screen-md px-4 py-20 sm:px-6 lg:px-8'>
          <BackBtn link={ROUTES.MISSIONS} />
          <Post reactionBtns mission={mission} userId={userId} />
          <div className='mb-12 mt-6'>
            <h3 className='mb-4 text-3xl'>Mission Community Links</h3>
            {mission.communityLinks.map((link) => (
              <CommunityLinksList
                key={link.id}
                linkName={link.linkName}
                linkUrl={link.linkUrl}
              />
            ))}
          </div>
          <ReactionBtns mission={mission} userId={userId} />
        </div>
        <div className='bg-light-2 py-20'>
          <div className='mx-auto max-w-screen-md px-2'>
            <div className='mb-20 flex flex-col items-center justify-between space-y-6 sm:flex-row sm:space-y-0'>
              <div className='flex flex-col items-center space-x-6 space-y-2 sm:flex-row sm:space-y-0'>
                <Avatar
                  src={mission.user.image}
                  alt={mission.user.name}
                  size='md'
                />
                <div className='text-center sm:text-left'>
                  <p className='font-bold capitalize text-dark-1'>
                    {mission.user.name}
                  </p>
                  <p className='text-sm capitalize text-dark-1'>...</p>
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
}
