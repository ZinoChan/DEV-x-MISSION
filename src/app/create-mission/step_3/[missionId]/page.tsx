import { authOptions } from '@/services/AuthOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MissionFormStep3 from '../MissionFormStep3';
import { xprisma } from '@/lib/prismaExtentions';
import { ROUTES } from '@/utils/routes';

interface Props {
  params: {
    missionId: string;
  };
}

export default async function CreateMissionStep_3({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session)
    redirect(`/api/auth/signin?callbackUrl=${ROUTES.CREATE_MISSION_STEP_1}`);
  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;

  const user = await xprisma.user.findByEmail(currentUserEmail);

  if (!user) return null;
  const mission = await xprisma.mission.findMissionById(params.missionId);

  if (mission == null) redirect(ROUTES.CREATE_MISSION_STEP_1);

  return (
    <>
      <MissionFormStep3 missionId={mission.id} />
    </>
  );
}
