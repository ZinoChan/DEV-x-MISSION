import { xprisma } from '@/lib/prismaExtentions';
import { authOptions } from '@/utils/AuthOptions';
import { ROUTES } from '@/utils/routes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EditFormStep3 from './EditFormStep3';
import { prisma } from '@/lib/prisma';

interface Props {
  params: {
    missionId: string;
  };
}

export default async function EditMissionStep_3({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    redirect(
      `/api/auth/signin?callbackUrl=${ROUTES.USER_PROFILE}/${params.missionId}/${ROUTES.CREATE_MISSION_STEP_3}`
    );

  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;
  const user = await xprisma.user.findByEmail(currentUserEmail);

  if (!user) return null;

  const mission = await prisma.mission.findFirst({
    where: {
      id: params.missionId,
    },
    include: {
      communityLinks: true,
    },
  });

  if (mission != null) return <EditFormStep3 mission={mission} />;
  return <div>mission not found</div>;
}
