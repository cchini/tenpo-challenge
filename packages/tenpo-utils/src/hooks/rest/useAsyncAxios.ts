import type { AxiosResponse } from 'axios';
import { useEffect } from 'react';

export const useAsync = <T>(
  asyncFn: () => Promise<AxiosResponse<T>>,
  successFunction: (data: T) => void,
  returnFunction: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((result) => {
      if (isActive) return successFunction(result.data);
    });
    return () => {
      if (returnFunction) returnFunction();
      isActive = false;
    };
  }, dependencies);
};
