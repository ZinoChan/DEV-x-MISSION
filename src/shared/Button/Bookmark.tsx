import { prisma } from '@/lib/prisma';
import BookmarkBtn from './BookmarkBtn';
import { xprisma } from '@/lib/prismaExtentions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/AuthOptions';
authOptions;

type Props = {
  missionId: string;
  currRoute: string;
};

export default async function Bookmark({ missionId, currRoute }: Props) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;
  const user = await xprisma.user.findByEmail(currentUserEmail ?? '');
  const missionSaved = await prisma.savedMission.findFirst({
    where: {
      missionId,
      userId: user?.id,
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
