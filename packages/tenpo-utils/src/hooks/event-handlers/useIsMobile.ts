import { useEffect, useState } from 'react';

/**
 * Custom React hook to detect whether the application is being viewed on a mobile screen.
 * Uses `window.matchMedia` to check viewport width.
 *
 * @returns { isMobile: boolean } - Boolean indicating if the screen is mobile.
 */
export const useIsMobile = () => {
  const getIsMobile = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 992px)').matches;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Protección SSR

    const matchMedia = window.matchMedia('(max-width: 992px)');
    const updateIsMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    matchMedia.addEventListener('change', updateIsMobile);
    return () => matchMedia.removeEventListener('change', updateIsMobile);
  }, []);

  return { isMobile };
};
