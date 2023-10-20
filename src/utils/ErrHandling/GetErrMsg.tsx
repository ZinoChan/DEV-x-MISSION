import { ErrorResponse } from '@/types/httpRes.types';

export function getErrorMessage(error: unknown): string {
  if (isErrRes(error)) {
    return error.message;
  }
  return 'An unknown error occurred.';
}

function isErrRes(obj: unknown): obj is ErrorResponse {
  return typeof obj === 'object' && obj != null && 'message' in obj;
}
