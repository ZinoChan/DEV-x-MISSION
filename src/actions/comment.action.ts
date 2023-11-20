'use server';
import { HTTP_STATUS } from '@/constants/httpStatus';
import { prisma } from '@/lib/prisma';
import { xprisma } from '@/lib/prismaExtentions';
import { authOptions } from '@/services/AuthOptions';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { HttpException } from '@/utils/ErrHandling/HttpException';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/utils/routes';

export async function addComment(formData: FormData) {
  const session = await getServerSession(authOptions);
  try {
    if (session == null)
      throw new HttpException(HTTP_STATUS.UNAUTHORIZED, 'login to comment');

    const currentUserEmail = session?.user?.email;

    if (currentUserEmail == null)
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'email not found');
    const user = await xprisma.user.findByEmail(currentUserEmail);

    if (!user) throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user not found');

    const schema = z.object({
      content: z.string().min(1),
      missionId: z.string(),
    });

    const data = schema.parse({
      content: formData.get('content'),
      missionId: formData.get('missionId'),
    });

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        userId: user.id,
        missionId: data.missionId,
      },
    });

    revalidatePath(`${ROUTES.MISSIONS}/${data.missionId}`);
    return {
      success: true,
      data: comment,
      message: null,
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    const { message, status } = handleErrMsg(error);
    return { success: false, data: null, message, status };
  }
}

export async function deleteComment(commentId: string) {
  const session = await getServerSession(authOptions);
  try {
    if (session == null)
      throw new HttpException(HTTP_STATUS.UNAUTHORIZED, 'login to comment');

    const currentUserEmail = session?.user?.email;

    if (currentUserEmail == null)
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'email not found');
    const user = await xprisma.user.findByEmail(currentUserEmail);

    if (!user) throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user not found');

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment)
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'comment not found');
    if (user.id != comment.userId)
      throw new HttpException(
        HTTP_STATUS.UNAUTHORIZED,
        "you don't have permission to del the comment"
      );

    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    if (deletedComment != null) {
      revalidatePath(`${ROUTES.MISSIONS}/${comment.missionId}`);
      return {
        success: true,
        data: deletedComment,
        message: null,
        status: HTTP_STATUS.OK,
      };
    }
    throw new HttpException(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'failed to delete comment'
    );
  } catch (error) {
    const { message, status } = handleErrMsg(error);
    return { success: false, data: null, message, status };
  }
}
