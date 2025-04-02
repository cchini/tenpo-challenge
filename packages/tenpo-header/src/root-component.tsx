import { StrictMode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { account$, preferences$, AccountState } from '@tenpo/states';
import Header from './components/header/Header';

/**
 * Root component serves as the main entry point of the application.
 * It manages user authentication state and language preferences.
 *
 * - Subscribes to `account$` to track the user's authentication state.
 * - Subscribes to `preferences$` to update the language preference dynamically.
 * - Wraps the `Header` component inside `StrictMode` for additional React checks in development.
 */
export default function Root() {
  /** Holds the authenticated user's state */
  const [user, setUser] = useState<AccountState>(null);

  const {
    i18n: { changeLanguage },
    t,
  } = useTranslation();

  /**
   * useEffect hook to subscribe to account and preference state changes.
   * - Updates the `user` state when authentication state changes.
   * - Updates the app language when user preferences change.
   * - Cleans up subscriptions on component unmount to prevent memory leaks.
   */
  useEffect(() => {
    const accountSubscription = account$.subscribe((state) => {
      setUser(state);
    });

    const preferencesSubscription = preferences$.subscribe(({ locale }) => {
      changeLanguage(locale);
    });

    return () => {
      accountSubscription.unsubscribe();
      preferencesSubscription.unsubscribe();
    };
  }, []);

  return (
    <StrictMode>
      <Header user={user} />
    </StrictMode>
  );
}
