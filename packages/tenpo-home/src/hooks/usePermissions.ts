import { useMemo } from 'react';
import useRouter, { HomePaths } from './useRouter';

// Enum defining different operations
export enum HomePermissions {
  HomeList = 'tenpo:home:list',
  HomeCreate = 'tenpo:home:create',
  HomeUpdate = 'tenpo:home:update',
}

// Hook to manage user permissions and route access
const usePermissions = (permissions: string[]) => {
  const paths = useRouter();
  const response = useMemo(() => {
    const validPaths = [];
    const switchPath = (value) => {
      switch (value) {
        case HomePermissions.HomeList:
          return paths.find((value) => value.path === HomePaths.List);
        case HomePermissions.HomeCreate:
          return paths.find((value) => value.path === HomePaths.Create);
        case HomePermissions.HomeUpdate:
          return paths.find((value) => value.path === HomePaths.Update);
      }
    };
    permissions.forEach((value) => {
      validPaths.push(switchPath(value));
    });
    return validPaths;
  }, [permissions]);

  return response;
};

export default usePermissions;
