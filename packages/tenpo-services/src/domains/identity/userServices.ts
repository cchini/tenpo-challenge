import { rest, type AxiosCall } from '@tenpo/utils';
import { AccountState, setAccountUser } from '@tenpo/states';

// Base URL for the identity API, taken from environment variables.
const identityUrl = process?.env?.REACT_APP_IDENTITY_API;

// Path for the account endpoint.
const identityAccountPath = `${identityUrl}/api/account`;

/**
 * Fetches the account details of the authenticated user.
 * Makes a GET request to the identity API to retrieve user account information.
 * If successful, the account details are stored in the state and returned.
 * If the request fails or the status is not 200, null is returned.
 *
 * @returns {Promise<AccountState | null>} - A promise that resolves with the account state if successful, or null if the request fails.
 */
export const account = async (): Promise<AccountState> => {
  try {
    const { get } = rest.axiosServices;
    const { callEndpoint } = rest.useFetchAndLoad();

    // Creating the Axios call for fetching the account details.
    const call: AxiosCall<any> = get(
      identityAccountPath,
      // Setting the content-type header for the request.
      { 'content-type': 'application/json' },
      {},
      false,
    );
    const response = await callEndpoint(call);

    // If the response is successful (status 200), format the account data and store it in the state.
    if (response.status === 200) {
      const data = response.data;
      const userAccount: AccountState = {
        user: data?.user,
        usename: data?.user,
        email: data?.email,
        permissions: data?.permissions,
      };
      // Storing the account data in the state.
      setAccountUser(userAccount);
      // Returning the account state.
      return userAccount;
    } else {
      // Returning null if the API response is not successful.
      return null;
    }
  } catch (error) {
    // Returning null in case of an error.
    return null;
  }
};
