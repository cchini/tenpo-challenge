import { useState, useEffect } from 'react';

export const useDebounce = <T>(initialValue: T, delay: number = 500) => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return {
    value,
    setValue,
    debouncedValue,
  };
};
