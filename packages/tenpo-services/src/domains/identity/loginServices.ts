import { rest, type AxiosCall } from '@tenpo/utils';
import { loginStates, logoutStates } from '@tenpo/states';

// Base URL for the identity API, taken from environment variables.
const identityUrl = process?.env?.REACT_APP_IDENTITY_API;

// Path for the login and logout endpoints.
const identityLoginPath = `${identityUrl}/api/login`;
const identityLogoutPath = `${identityUrl}/api/logout`;

// Interface defining the structure of user login data.
export interface UserLogin {
  user: string; // Username of the user
  password: string; // Password for the user
}

/**
 * Logs in the user by sending the login request to the identity API.
 * If the login is successful, it stores the authentication token in the state.
 * If the login fails, it logs the user out.
 *
 * @param {UserLogin} data - The login data including username and password.
 */
export const login = async (data: UserLogin) => {
  try {
    const { post } = rest.axiosServices;
    const { callEndpoint } = rest.useFetchAndLoad();

    // Creating the Axios call for the login request.
    const call: AxiosCall<any> = post(
      identityLoginPath,
      // Setting the content-type header for the request.
      { 'content-type': 'application/json' },
      // Passing the login data (username and password).
      data,
      {},
      false,
    );
    const response = await callEndpoint(call);
    // If the login is successful, store the token in the state.
    if (response.status === 200) {
      loginStates(response.data.token);
    } else {
      // If the login fails, log the user out.
      logoutStates();
    }
    return response;
  } catch (error) {
    // In case of an error, log the user out and log the error.
    logoutStates();
    console.debug('ERROR', error);
    return error;
  }
};

/**
 * Logs out the user by calling the logout function and clearing the session.
 */
export const logout = () => {
  logoutStates(); // Logging out the user by clearing their session.
  window.location.reload();
};
