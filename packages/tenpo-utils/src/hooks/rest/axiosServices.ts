import axios, { type AxiosResponse } from 'axios';
import type { AxiosCall } from './useFetchAndLoad';
import { loadAbort } from '../../utils/rest/loadAbort';

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
  abort = false
): AxiosCall<T> => {
  const controller = loadAbort();

  if (abort) controller.abort();

  const call: Promise<AxiosResponse<T>> = axios.get<T>(api, {
    headers,
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
  abort = false
): AxiosCall<T> => {
  const controller = loadAbort();

  if (abort) controller.abort();

  const call: Promise<AxiosResponse<T>> = axios.post<T>(api, data, {
    headers,
    params,
    signal: controller.signal,
  });

  return {
    call,
    controller,
  };
};
