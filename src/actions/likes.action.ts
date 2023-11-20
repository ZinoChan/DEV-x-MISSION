'use server';

import { HTTP_STATUS } from '@/constants/httpStatus';
import { prisma } from '@/lib/prisma';
import { xprisma } from '@/lib/prismaExtentions';
import { authOptions } from '@/services/AuthOptions';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { HttpException } from '@/utils/ErrHandling/HttpException';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/utils/routes';

export async function like(missionId: string, currRoute: string) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin?callbackUrl=${currRoute}`);

  const currentUserEmail = session?.user?.email;
  try {
    if (currentUserEmail == null)
      throw new HttpException(
        HTTP_STATUS.NOT_FOUND,
        'user with this email not found'
      );
    const user = await xprisma.user.findByEmail(currentUserEmail);

    if (!user)
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user not found in db');

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: user.id,
        missionId: missionId,
      },
    });

    if (existingLike != null) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          missionId: missionId,
        },
      });
    }
    const likeCount = await prisma.like.count({
      where: {
        missionId: missionId,
      },
    });
    revalidatePath(ROUTES.MISSIONS);
    return {
      success: true,
      data: likeCount,
      message: null,
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    const { message, status } = handleErrMsg(error);
    return { success: false, data: null, message, status };
  }
}
