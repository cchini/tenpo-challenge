import { rest, type AxiosCall } from '@tenpo/utils';

// Base URL for the CoinGecko API, taken from environment variables.
const coingekoUrl = process?.env?.REACT_APP_COINGEKO_API;

// Path to fetch market data from the CoinGecko API.
const coinsPath = `${coingekoUrl}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`;

/**
 * Fetches a paginated list of coins from the CoinGecko API.
 * @param {number} page - The page number to retrieve.
 * @param {number} size - The number of coins per page.
 * @returns {Promise<any>} - A promise that resolves with the list of coins.
 */
export const getCoins = async (page: number, size: number) => {
  try {
    const { get } = rest.axiosServices;
    const { callEndpoint } = rest.useFetchAndLoad();
    // Constructing the full URL with pagination parameters (page and size).
    const url = `${coinsPath}&per_page=${size.toString()}&page=${page.toString()}`;

    // Preparing the Axios call with necessary headers and options.
    const call: AxiosCall<any> = get(
      url,
      // Setting the content-type header for the request.
      { 'content-type': 'application/json' },
      {},
      false,
    );

    const response = await callEndpoint(call);
    return response;
  } catch (error) {
    // Returning any errors that occur during the API call.
    return error;
  }
};
