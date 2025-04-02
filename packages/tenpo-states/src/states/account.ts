import { BehaviorSubject } from 'rxjs';

// Interface defining the structure of the account state.
export interface AccountState {
  user: string;
  usename: string;
  email: string;
  permissions: string[];
}

// Initial state for the account, with null values as defaults.
const accountInit: AccountState = {
  user: null,
  usename: null,
  email: null,
  permissions: null,
};

// BehaviorSubject to handle and observe the account state reactively.
export const account$ = new BehaviorSubject(accountInit);

// Function to set or update the account state.
export const setAccountUser = (user: AccountState) => {
  account$.next({ ...user });
};

// Function to retrieve the current account state.
export const getAccountUser = () => {
  return account$.value;
};
