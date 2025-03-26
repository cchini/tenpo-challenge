import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

export interface UseClickOutsideProps {
  ref?: MutableRefObject<any>;
  onClickOutside?: (event: MouseEvent) => void;
}

/**
 * A custom React hook that detects clicks outside of a specified element.
 *
 * @param {MutableRefObject<any>} props.ref - The ref object that points to the element to detect clicks outside of.
 * @param {Function} props.onClickOutside - The callback function to be called when a click outside of the element occurs.
 */
export const useClickOutside = ({
  ref,
  onClickOutside,
}: UseClickOutsideProps) => {
  let hasListener = false;

  /**
   * Handles the click outside event.
   *
   * @param {MouseEvent} event - The click event.
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      event.button === 0
    ) {
      onClickOutside?.(event);
    }
  };

  const setListener = () => {
    document.addEventListener('mousedown', handleClickOutside);
  };

  const removeListener = () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleListenersState = () => {
    if (!hasListener) {
      setListener();
      hasListener = true;
      return;
    }

    removeListener();
    setListener();
  };

  useEffect(() => {
    handleListenersState();

    return () => {
      removeListener();
    };
  }, [ref]);
};
