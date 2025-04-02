import SecureStorage from 'secure-web-storage';
import CryptoJS from 'crypto-js';

// Secret key used for encryption and decryption, taken from environment variables.
const SECRET_KEY = process?.env?.REACT_APP_SECRET_KEY;

// Enum to define the different keys used in secure storage.
export enum StorageKeys {
  Token = 'storage-token', // Key for storing the authentication token
  Locale = 'storage-locale', // Key for storing the user's locale (language preference)
  IdentityApi = 'storage-identity-api', // Key for storing the identity API URL
}

// Creating a secure session storage with encryption and decryption methods using CryptoJS.
const secureSessionStorage = new SecureStorage(sessionStorage, {
  // Hash function to securely hash the storage key.
  hash: (key: string) => CryptoJS.SHA256(key).toString(),

  // Encryption function to securely encrypt the data before storing it.
  encrypt: (data: any) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString(),

  // Decryption function to securely decrypt the data when retrieving it.
  decrypt: (data: any) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
});

/**
 * Stores the authentication token in secure session storage.
 * @param {string} token - The token to be stored.
 */
export const setStorageToken = (token: string) => {
  secureSessionStorage.setItem(StorageKeys.Token, token);
};

/**
 * Stores the user's locale (language preference) in secure session storage.
 * @param {string} locale - The locale to be stored (e.g., 'en', 'es').
 */
export const setStorageLocale = (locale: string) => {
  secureSessionStorage.setItem(StorageKeys.Locale, locale);
};

/**
 * Retrieves the authentication token from secure session storage.
 * @returns {string} - The stored authentication token.
 */
export const getStorageToken = () => {
  return secureSessionStorage.getItem(StorageKeys.Token);
};

/**
 * Retrieves the user's locale (language preference) from secure session storage.
 * @returns {string} - The stored locale.
 */
export const getStorageLocale = () => {
  return secureSessionStorage.getItem(StorageKeys.Locale);
};

/**
 * Clears all items from the secure session storage.
 */
export const clearStorageSession = () => {
  secureSessionStorage.clear();
};
