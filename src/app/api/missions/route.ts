import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { xprisma } from '@/lib/prismaExtentions';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) throw Error('user email does not exist');

  const user = await xprisma.user.findByEmail(currentUserEmail);
  if (user === null) throw Error('user does not exists');
  const data = await req.json();

  try {
    const mission = await prisma.mission.create({
      data: { ...data, userId: user.id },
    });
    return NextResponse.json({ mission }, { status: 201 });
  } catch (error) {
    const errMsg = handleErrMsg(error);
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 }
    );
  }
}
