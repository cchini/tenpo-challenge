import type { AxiosResponse } from 'axios';
import { useEffect } from 'react';

export interface AxiosCall<T> {
  call: Promise<AxiosResponse<T>>;
  controller?: AbortController;
}

const useFetchAndLoad = () => {
  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      throw err;
    }
    return result;
  };

  const cancelEndpoint = () => {
    if (controller) controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  });

  return { callEndpoint };
};

export default useFetchAndLoad;
