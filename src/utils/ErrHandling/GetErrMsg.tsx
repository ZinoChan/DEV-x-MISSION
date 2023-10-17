import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response) {
    return error.response.data.message;
  }
  return 'An unknown error occurred.';
}
