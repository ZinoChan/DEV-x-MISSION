import { HTTP_STATUS } from '@/constants/httpStatus';
import { prisma } from '@/lib/prisma';
import { xprisma } from '@/lib/prismaExtentions';
import { authOptions } from '@/utils/AuthOptions';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { HttpException } from '@/utils/ErrHandling/HttpException';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  try {
    if (currentUserEmail == null)
      throw new HttpException(
        HTTP_STATUS.NOT_FOUND,
        'user email does not exist'
      );

    const user = await xprisma.user.findByEmail(currentUserEmail);
    if (user === null)
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user does not exists');

    const userMissions = await xprisma.mission.getUserMissions(user.id);
    return NextResponse.json({ userMissions }, { status: 200 });
  } catch (error) {
    const { status, message } = handleErrMsg(error);
    return NextResponse.json({ success: false, message, status }, { status });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  try {
    if (currentUserEmail == null)
      throw new HttpException(
        HTTP_STATUS.NOT_FOUND,
        'user email does not exist'
      );

    const user = await xprisma.user.findByEmail(currentUserEmail);
    if (user === null)
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user does not exists');
    const data = await req.json();
    const mission = await prisma.mission.create({
      data: { ...data, userId: user.id },
    });
    return NextResponse.json({ mission }, { status: 201 });
  } catch (error) {
    const { status, message } = handleErrMsg(error);
    return NextResponse.json({ success: false, message, status }, { status });
  }
}
