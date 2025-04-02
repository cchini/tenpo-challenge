import { BehaviorSubject } from 'rxjs';
import { setStorageToken, clearStorageSession } from '../storage/session';

// Defining the structure of the identity state.
export interface IdentityState {
  isAuthenticated: boolean;
  token: string;
  urlApi: string;
}

// Initial state for the identity, with default values.
const identityInitData: IdentityState = {
  isAuthenticated: false,
  token: null,
  urlApi: '',
};

// BehaviorSubject to manage the identity state reactively.
export const identity$ = new BehaviorSubject(identityInitData);

/**
 * Updates the API URL in the identity state.
 * @param {string} url - The API URL to set in the state.
 */
export const setUrlApi = (url: string) => {
  const cloneIdentity = { ...identity$.value };
  cloneIdentity.urlApi = url; // Updating the URL in the state
  identity$.next({ ...cloneIdentity }); // Emitting the new state
};

/**
 * Login the user by updating the identity state with the given token.
 * It also stores the token in session storage.
 * @param {string} token - The authentication token to set.
 */
export const loginStates = (token: string) => {
  const clone = { ...identity$.value };
  clone.token = token; // Setting the new token
  clone.isAuthenticated = true; // Marking the user as authenticated
  setStorageToken(token); // Storing the token in session storage
  identity$.next({ ...clone }); // Emitting the updated state
};

/**
 * Logout the user by clearing the identity state and removing the token.
 * It also clears session storage.
 */
export const logoutStates = () => {
  const clone = { ...identity$.value };
  clone.token = null; // Clearing the token
  clone.isAuthenticated = false; // Marking the user as unauthenticated
  clearStorageSession(); // Clearing session storage
  identity$.next({ ...clone }); // Emitting the updated state
};
