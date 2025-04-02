import { StrictMode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootRouter from './root-router';
import { useTranslation } from 'react-i18next';
import { preferences$ } from '@tenpo/states';

const queryClient = new QueryClient();

/**
 * The root component that sets up the core of the application.
 * It initializes the React Query client, manages the language preferences,
 * and configures routing using React Router.
 *
 * @returns {JSX.Element} The root component that wraps the app in necessary providers.
 */
export default function Root() {
  const {
    i18n: { changeLanguage },
    t,
  } = useTranslation();

  /**
   * Effect hook that subscribes to the user's preferences,
   * specifically the `locale` setting to dynamically change the app's language.
   * It listens for changes in the preferences and updates the language accordingly.
   */
  useEffect(() => {
    // Subscribe to preferences to monitor language changes
    const preferencesSubscription = preferences$.subscribe(({ locale }) => {
      changeLanguage(locale); // Change the language based on user preference
    });

    // Cleanup subscription on component unmount
    return () => {
      preferencesSubscription.unsubscribe();
    };
  }, [changeLanguage]);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/home">
          <RootRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}
