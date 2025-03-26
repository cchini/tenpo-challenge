import { start, handleBaseRedirect } from './tenpo-init';
import layoutApp from './microfrontend-layout.html';
import layoutError from './layout-error.html';

const isErrorOccurred = false;

if (!isErrorOccurred) start(layoutApp);
else {
  start(layoutError);
  handleBaseRedirect('authentication-error');
}
