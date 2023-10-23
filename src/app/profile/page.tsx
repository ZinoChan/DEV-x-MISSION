import { xprisma } from '@/lib/prismaExtentions';
import { authOptions } from '@/utils/AuthOptions';
import { ROUTES } from '@/utils/routes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MissionList from './components/MissionList';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin?callbackUrl=${ROUTES.USER_PROFILE}`);

  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) return null;
  const user = await xprisma.user.findByEmail(currentUserEmail);

  if (!user) return null;

  return <MissionList />;
}
