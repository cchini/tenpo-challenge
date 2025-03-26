import { useEffect, useState } from 'react';

/**
 * A custom React hook that detects whether the application is being viewed on a mobile screen or not.
 * It uses the `window.matchMedia` API to check the maximum width of the viewport.
 *
 * @returns An object containing the `isMobile` boolean value indicating whether the application is being viewed on a mobile screen or not.
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia('(max-width: 992px)');
    setIsMobile(matchMedia.matches);

    const updateIsMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    matchMedia.addEventListener('change', updateIsMobile);
    return () => matchMedia.removeEventListener('change', updateIsMobile);
  }, []);

  return {
    isMobile,
  };
};
