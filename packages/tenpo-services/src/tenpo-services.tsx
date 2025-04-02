import { account } from './domains/identity/userServices';
import { login, logout } from './domains/identity/loginServices';
import { getCoins } from './domains/coingecko/coinServices';
import { getUsers } from './domains/random/randomUserService';

// Grouping the identity-related functions in an object for easier access
const identity = {
  login, // Function to log in the user
  logout, // Function to log out the user
  account, // Function to fetch account details of the authenticated user
};

// Grouping the CoinGecko-related functions in an object for easier access
const coingecko = {
  getCoins, // Function to get a list of coins from CoinGecko API
};

const random = {
  getUsers, // Function to get a list of random users from Random API
};

// Exporting the grouped objects so they can be used in other parts of the application
export { identity, coingecko, random };
export type { UserLogin } from './domains/identity/loginServices';
export type { User, UserList } from './domains/random/random.types';
