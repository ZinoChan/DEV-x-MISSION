import prismaErrorMsg from './PrismaErrorMaper';
import { Prisma } from '@prisma/client';

export function handleErrMsg(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaErrorMsg(error.message);
  } else if (error instanceof Error) {
    return error.message.length > 0
      ? error.message
      : 'failed to create mission';
  } else {
    return 'An unknown error occurred';
  }
}
