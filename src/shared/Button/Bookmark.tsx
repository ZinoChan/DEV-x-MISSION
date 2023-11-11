import { prisma } from '@/lib/prisma';
import BookmarkBtn from './BookmarkBtn';
import { authOptions } from '@/utils/AuthOptions';
authOptions;

type Props = {
  missionId: string;
  currRoute: string;
  userId: string;
};

export default async function Bookmark({
  missionId,
  currRoute,
  userId,
}: Props) {
  const missionSaved = await prisma.savedMission.findFirst({
    where: {
      missionId,
      userId: userId,
    },
  });
  return (
    <BookmarkBtn
      missionId={missionId}
      currRoute={currRoute}
      missionSaved={missionSaved != null}
    />
  );
}
