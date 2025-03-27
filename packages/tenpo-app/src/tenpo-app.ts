import { start, handleBaseRedirect } from './tenpo-init';
import layoutApp from './microfrontend-layout.html';
import layoutError from './layout-error.html';
import {
  identity$,
  account$,
  setUrlApi,
  getStorageToken,
  loginStates,
} from '@tenpo/states';
import { identity as identityService } from '@tenpo/services';

let isStarted = false;
const localToken = getStorageToken();

const startApp = (isOk) => {
  if (isOk && !isStarted) {
    start(layoutApp);
    isStarted = true;
  } else {
    start(layoutError);
    handleBaseRedirect('authentication-error'); // update to general error
  }
};

if (localToken) loginStates(localToken);

if (!localToken) {
  startApp(true);
  window.history.replaceState(
    {},
    document.title,
    `${window.location.origin}/login`,
  );
}

if (!identity$.value.urlApi) {
  const identityUrl = process?.env?.REACT_APP_IDENTITY_API;
  if (identityUrl) {
    setUrlApi(identityUrl);
  } else {
    startApp(false);
  }
}

const identityTest = identity$.subscribe((states) => {
  if (states?.isAuthenticated && states?.urlApi) {
    identityService.account(`${states?.urlApi}/api/account`);
  }
  return () => {
    identityTest.unsubscribe();
  };
});

const account = account$.subscribe(({ permissions }) => {
  if (permissions?.length > 0 && !isStarted) {
    startApp(true);
  }
  return () => {
    account.unsubscribe();
  };
});
