import { useEffect, useState } from 'react';

export const useDebounce = () => {
  const [value, setValue] = useState(null);
  const [debouncedValue, setDebouncedValue] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return {
    value,
    setValue,
    debouncedValue,
  };
};
