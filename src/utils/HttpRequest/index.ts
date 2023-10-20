import { HTTP_STATUS } from '@/constants/httpStatus';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const httpRequest = <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const response = await axios({ method, url, data, ...config });

      if (
        response.status === HTTP_STATUS.OK ||
        response.status === HTTP_STATUS.CREATED
      ) {
        resolve(response.data);
      } else {
        reject(response.data != null ? response.data : {});
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      reject(
        axiosError.response?.data != null
          ? axiosError.response?.data
          : { success: false, message: 'An unknown error occurred.' }
      );
    }
  });
};
