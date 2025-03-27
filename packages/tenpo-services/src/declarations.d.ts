declare module '@tenpo/states' {
  export const identity$;
  export const account$;
  export const setUrlApi;
  export const getUrlApi;
  export const loginStates;
  export const logoutStates;
  export const setAccountUser;
  export const getToken;
  export const getAccountUser;
  export interface AccountState {
    user: string;
    usename: string;
    email: string;
    permissions: string[];
  }
}

declare module '@tenpo/utils' {
  import type { AxiosResponse } from 'axios';

  export const useAsync: <T>(
    asyncFn: () => Promise<import('axios').AxiosResponse<T>>,
    successFunction: (data: T) => void,
    returnFunction: () => void,
    dependencies?: any[],
  ) => void;
  export interface AxiosCall<T> {
    call: Promise<AxiosResponse<T>>;
    controller?: AbortController;
  }
  export const useFetchAndLoad;
  export const loadAbort;
  export const eventHandlers;
  export const rest: {
    axiosServices: {
      get: (
        api: string,
        headers: any,
        params: any,
        abort: boolean,
      ) => AxiosCall<any>;
      post: (
        api: string,
        headers: any,
        data: any,
        params: any,
        abort: boolean,
      ) => AxiosCall<any>;
    };

    useAsync: <T>(
      asyncFn: () => Promise<import('axios').AxiosResponse<T>>,
      successFunction: (data: T) => void,
      returnFunction: () => void,
      dependencies?: any[],
    ) => void;
    useFetchAndLoad: () => {
      loading: boolean;
      callEndpoint: (
        axiosCall: AxiosCall<any>,
      ) => Promise<AxiosResponse<any, any>>;
    };
    loadAbort;
  };
}
