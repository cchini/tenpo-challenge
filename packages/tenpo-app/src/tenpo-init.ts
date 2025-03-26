import { registerApplication, start as singleSpaStart } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

export const start = (layout) => {
  const routes = constructRoutes(layout);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });
  const layoutEngine = constructLayoutEngine({ routes, applications });
  applications.forEach(registerApplication);
  layoutEngine.activate();
  singleSpaStart();
};

export const handleBaseRedirect = (path: string) => {
  window.history.replaceState(
    {},
    document.title,
    `${window.location.origin}/${path}`,
  );
};
