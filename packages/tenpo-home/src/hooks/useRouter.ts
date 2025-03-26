import HomeList from '../pages/home-list';
import HomeCreate from '../pages/home-create';
import HomeUpdate from '../pages/home-update';

export interface RouterPath {
  path: string;
  element: (props) => JSX.Element;
}

export enum HomePaths {
  List = '/list',
  Create = '/create',
  Update = '/update',
}

const useRouter = (): RouterPath[] => [
  {
    path: HomePaths.List,
    element: HomeList,
  },
  {
    path: HomePaths.Create,
    element: HomeCreate,
  },
  {
    path: HomePaths.Update,
    element: HomeUpdate,
  },
];

export default useRouter;
