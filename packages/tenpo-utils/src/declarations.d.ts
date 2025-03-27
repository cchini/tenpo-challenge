declare module '@tenpo/states' {
  export const identity$;
  export const account$;
  export const setUrlApi;
  export const getUrlApi;
  export const loginStates;
  export const logoutStates;
  export const setAccountUser;
  export const getAccountUser;
  export const getStorageToken;
  export const getStorageLocale;
  export interface AccountState {
    user: string;
    usename: string;
    email: string;
    permissions: string[];
  }
}
