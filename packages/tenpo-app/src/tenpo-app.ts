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

// Function to start the app or show error based on authentication status
const startApp = (isOk) => {
  if (isOk && !isStarted) {
    start(layoutApp);
    isStarted = true;
  } else {
    start(layoutError);
    handleBaseRedirect('authentication-error'); // update to general error
  }
};

// If token exists, set the login state
if (localToken) loginStates(localToken);

// If no token is present, start the app with login layout
if (!localToken) {
  startApp(true);
  window.history.replaceState(
    {},
    document.title,
    `${window.location.origin}/login`,
  );
}

// Set API URL if not already set
if (!identity$.value.urlApi) {
  const identityUrl = process?.env?.REACT_APP_IDENTITY_API;
  if (identityUrl) {
    setUrlApi(identityUrl);
  } else {
    startApp(false);
  }
}

// Subscribe to identity state to check for authentication
const identity = identity$.subscribe((states) => {
  if (states?.isAuthenticated && states?.urlApi) {
    identityService.account(`${states?.urlApi}/api/account`);
  }
  return () => {
    identity.unsubscribe();
  };
});

// Subscribe to account state to check for permissions
const account = account$.subscribe(({ permissions }) => {
  if (permissions?.length > 0 && !isStarted) {
    startApp(true);
  }
  return () => {
    account.unsubscribe();
  };
});
