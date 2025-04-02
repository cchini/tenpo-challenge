import { AxiosResponse } from 'axios';
import { rest, type AxiosCall } from '@tenpo/utils';
import { UserList, RandomInfoPage } from './random.types';

// Base URL for the CoinGecko API, taken from environment variables.
const urlRandomUser = process?.env?.REACT_APP_RANDOM_USER_API;

// Path to fetch market data from the CoinGecko API.
const randomUserPath = `${urlRandomUser}/api/`;

interface ApiResponse {
  results: UserList[];
  info: RandomInfoPage;
}

/**
 * Fetches a paginated list of coins from the CoinGecko API.
 * @param {number} page - The page number to retrieve.
 * @param {number} size - The number of coins per page.
 * @returns {Promise<any>} - A promise that resolves with the list of coins.
 */
export const getUsers = async (page: number, size: number) => {
  try {
    const { get } = rest.axiosServices;
    const { callEndpoint } = rest.useFetchAndLoad();
    // Constructing the full URL with pagination parameters (page and size).
    const url = `${randomUserPath}?results=${size.toString()}&page=${page.toString()}`;

    // Preparing the Axios call with necessary headers and options.
    const call: AxiosCall<any> = get(
      url,
      // Setting the content-type header for the request.
      { 'content-type': 'application/json' },
      {},
      false,
    );

    const response: AxiosResponse<ApiResponse> = await callEndpoint(call);
    return response;
  } catch (error) {
    // Returning any errors that occur during the API call.
    return error;
  }
};
