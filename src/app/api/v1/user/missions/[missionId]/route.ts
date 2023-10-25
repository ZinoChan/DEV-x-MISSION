import { HTTP_STATUS } from '@/constants/httpStatus';
import { authOptions } from '@/utils/AuthOptions';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { deleteMission, updateMission } from '../mission.service';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/utils/routes';

export async function PUT(
  req: Request,
  { params }: { params: { missionId: string } }
) {
  const { missionId } = params;
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  try {
    const mission = await updateMission(req, missionId, currentUserEmail);
    if (mission.published == true) revalidatePath(ROUTES.MISSIONS, 'page');
    return NextResponse.json({ mission }, { status: HTTP_STATUS.OK });
  } catch (error) {
    const { message, status } = handleErrMsg(error);
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { missionId: string } }
) {
  const { missionId } = params;
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  try {
    const deletedMission = await deleteMission(missionId, currentUserEmail);
    if (deletedMission.published == false)
      revalidatePath(ROUTES.MISSIONS, 'page');
    return NextResponse.json({ mission: deletedMission });
  } catch (error) {
    const { status, message } = handleErrMsg(error);
    return NextResponse.json({ success: false, message, status }, { status });
  }
}
