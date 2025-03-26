import AuthenticationError from '../pages/authentication-error/AuthenticationError';
import PermissionDenied from '../pages/permission-denied/PermissionDenied';

interface RouterPath {
  path: string;
  element: (props: any) => JSX.Element;
}

const useRouter = (): RouterPath[] => {
  const routes: RouterPath[] = [
    {
      path: '/authentication-error',
      element: AuthenticationError,
    },
    {
      path: '/permission-denied',
      element: PermissionDenied,
    },
  ];

  return routes;
};

export default useRouter;
