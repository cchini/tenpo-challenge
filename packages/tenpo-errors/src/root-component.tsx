import { StrictMode, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useRouter from './hooks/useRouter';
import { useTranslation } from 'react-i18next';
import { preferences$ } from '@tenpo/states';

export default function Root() {
  const router = useRouter();

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
      <BrowserRouter basename="/home">
        <Routes>
          {router?.map((value) => (
            <Route
              key={value.path}
              path={value.path}
              element={<value.element />}
            />
          ))}
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename="/">
        <Routes>
          {router?.map((value) => (
            <Route
              key={value.path}
              path={value.path}
              element={<value.element />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
