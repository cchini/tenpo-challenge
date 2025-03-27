import axios, { type AxiosResponse } from 'axios';
import type { AxiosCall } from './useFetchAndLoad';
import { loadAbort } from '../../utils/rest/loadAbort';
import { getStorageToken } from '@tenpo/states';

/**
 * Axios Get
 * @param api
 * @param headers
 * @param params
 * @param abort
 * @returns {call, controller  }
 */
export const get = <T>(
  api: string,
  headers = {},
  params = {},
  abort = false,
): AxiosCall<T> => {
  const controller = loadAbort();
  if (abort) controller.abort();
  const token = getStorageToken();
  const call: Promise<AxiosResponse<T>> = axios.get<T>(api, {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
    params,
    signal: controller.signal,
  });
  return {
    call,
    controller,
  };
};

/**
 *
 * @param api
 * @param headers
 * @param data
 * @param params
 * @param abort
 * @returns
 */
export const post = <T>(
  api: string,
  headers = {},
  data = {},
  params = {},
  abort = false,
): AxiosCall<T> => {
  const controller = loadAbort();
  if (abort) controller.abort();
  const token = getStorageToken();
  const call: Promise<AxiosResponse<T>> = axios.post<T>(api, data, {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
    params,
    signal: controller.signal,
  });

  return {
    call,
    controller,
  };
};
