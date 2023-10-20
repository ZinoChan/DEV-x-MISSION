import { HTTP_STATUS } from '@/constants/httpStatus';
import { HttpException } from './HttpException';
import { getPrismaErrorMessage } from './PrismaErrorMaper';
import { Prisma } from '@prisma/client';

export function handleErrMsg(error: unknown) {
  let status;
  let message;
  if (isPrismaError(error)) {
    const prismaErr = getPrismaErrorMessage(
      error as Prisma.PrismaClientKnownRequestError
    );
    message = prismaErr.message;
    status = prismaErr.httpStatus;
  } else if (error instanceof HttpException) {
    message = error.message;
    status = error.status;
  }
  if (status == null) status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  if (message == null) message = 'An unknown error occurred';
  return { status, message };
}

export function isPrismaError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  );
}
