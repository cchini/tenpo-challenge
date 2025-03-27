import { BehaviorSubject } from 'rxjs';

export interface AccountState {
  user: string;
  usename: string;
  email: string;
  permissions: string[];
}

const accountInit: AccountState = {
  user: null,
  usename: null,
  email: null,
  permissions: null,
};

export const account$ = new BehaviorSubject(accountInit);

export const setAccountUser = (user: AccountState) => {
  account$.next({ ...user });
};

export const getAccountUser = () => {
  return account$.value;
};
