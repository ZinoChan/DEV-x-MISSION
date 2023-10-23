import { HTTP_STATUS } from '@/constants/httpStatus';
import { authOptions } from '@/utils/AuthOptions';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { addMission, getMissions } from './mission.service';

export async function GET() {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  try {
    const userMissions = await getMissions(currentUserEmail);
    return NextResponse.json({ userMissions }, { status: HTTP_STATUS.OK });
  } catch (error) {
    const { status, message } = handleErrMsg(error);
    return NextResponse.json({ success: false, message, status }, { status });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  try {
    const mission = await addMission(req, currentUserEmail);
    return NextResponse.json({ mission }, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    const { status, message } = handleErrMsg(error);
    return NextResponse.json({ success: false, message, status }, { status });
  }
}
