import SecureStorage from 'secure-web-storage';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process?.env?.REACT_APP_SECRET_KEY;
export enum StorageKeys {
  Token = 'storage-token',
  Locale = 'storage-locale',
  IdentityApi = 'storage-identity-api',
}

const secureSessionStorage = new SecureStorage(sessionStorage, {
  hash: (key: string) => CryptoJS.SHA256(key).toString(),
  encrypt: (data: any) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString(),
  decrypt: (data: any) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
});

export const setStorageToken = (token: string) => {
  secureSessionStorage.setItem(StorageKeys.Token, token);
};

export const setStorageLocale = (locale: string) => {
  secureSessionStorage.setItem(StorageKeys.Locale, locale);
};

export const getStorageToken = () => {
  return secureSessionStorage.getItem(StorageKeys.Token);
};

export const getStorageLocale = () => {
  return secureSessionStorage.getItem(StorageKeys.Locale);
};

export const clearStorageSession = () => {
  secureSessionStorage.clear();
};
