import { BehaviorSubject } from 'rxjs';
import { setStorageLocale } from '../storage/session';

// Interface defining the structure of the preferences state.
export interface PreferencesState {
  locale: string;
}

// Initial state for the preferences, with null values as defaults.
const preferencesInit: PreferencesState = {
  locale: 'es',
};

// BehaviorSubject to handle and observe the account state reactively.
export const preferences$ = new BehaviorSubject(preferencesInit);

// Function to set or update the account state.
export const setLocaleUser = (locale: string) => {
  const clonePreferences = { ...preferences$.value };
  clonePreferences.locale = locale;
  setStorageLocale(locale);
  preferences$.next({ ...clonePreferences }); // Emitting the new state
};
