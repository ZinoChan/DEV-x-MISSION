import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MissionFormStep1 from './MissionFormStep1';
import { ROUTES } from '@/utils/routes';

export default async function CreateMissionStep_1() {
  const session = await getServerSession(authOptions);

  if (!session)
    redirect(`/api/auth/signin?callbackUrl=${ROUTES.CREATE_MISSION_STEP_1}`);

  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  if (!user) return null;

  return (
    <>
      <MissionFormStep1 />
    </>
  );
}
