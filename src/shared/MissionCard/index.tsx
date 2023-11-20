import { ExtendedMission } from '@/types/mission.types';
import { ROUTES } from '@/utils/routes';
import LikeBtn from '../Button/LikeBtn';
import VoteBtn from '../Button/VoteBtn';
import Bookmark from '../Button/Bookmark';
import MissionCardHeader from './MissionCardHeader';
import MissionAuthor from './MissionAuthor';

export default function MissionCard({
  mission,
  userId,
}: {
  mission: ExtendedMission;
  userId: string;
}) {
  return (
    <div className='flex flex-col justify-between rounded-md bg-light-3 p-6 shadow transition-all hover:shadow-lg'>
      <MissionCardHeader
        id={mission.id}
        missionName={mission.missionName}
        missionObjective={mission.missionObjective}
        missionStatus={mission.missionStatus}
        skillLevel={mission.skillLevel}
      />
      {!mission.archived && (
        <div className='flex items-center justify-between'>
          <MissionAuthor
            authorImage={mission.user.image}
            authorName={mission.user.name}
          />
          <div className='flex items-center space-x-3'>
            <LikeBtn
              missionId={mission.id}
              likeCount={mission.likes.length}
              currRoute={ROUTES.MISSIONS}
              userLikes={mission.likes.some((like) => like.userId === userId)}
            />

            <VoteBtn
              missionId={mission.id}
              voteCount={mission.votes.length}
              currRoute={ROUTES.MISSIONS}
              userVotes={mission.votes.some((vote) => vote.userId === userId)}
            />
            <Bookmark
              userId={userId}
              missionId={mission.id}
              currRoute={ROUTES.MISSIONS}
            />
          </div>
        </div>
      )}
    </div>
  );
}
