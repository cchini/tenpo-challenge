import { BehaviorSubject } from 'rxjs';
import { setStorageToken, clearStorageSession } from '../storage/session';

export interface IdentityState {
  isAuthenticated: boolean;
  token: string;
  urlApi: string;
}

const identityInitData: IdentityState = {
  isAuthenticated: false,
  token: null,
  urlApi: '',
};

export const identity$ = new BehaviorSubject(identityInitData);

export const setUrlApi = (url: string) => {
  const cloneIdentity = { ...identity$.value };
  cloneIdentity.urlApi = url;
  identity$.next({ ...cloneIdentity });
};

export const getUrlApi = () => {
  return identity$.value.urlApi;
};

export const getStateToken = () => {
  return identity$.value.token;
};

export const loginStates = (token: string) => {
  const clone = { ...identity$.value };
  clone.token = token;
  clone.isAuthenticated = true;
  setStorageToken(token);
  identity$.next({ ...clone });
};

export const logoutStates = () => {
  const clone = { ...identity$.value };
  clone.token = null;
  clone.isAuthenticated = false;
  clearStorageSession();
  identity$.next({ ...clone });
};
