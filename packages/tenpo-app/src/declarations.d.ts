declare module '*.html' {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '@tenpo/states' {
  export const identity$;
  export const account$;
  export const setUrlApi;
  export const getUrlApi;
  export const loginStates;
  export const logoutStates;
  export const setAccountUser;
  export const getAccountUser;
  export const getToken;
  export const getStorageToken;
  export const getStorageLocale;
  export interface AccountState {
    user: string;
    usename: string;
    email: string;
    permissions: string[];
  }
}

declare module '@tenpo/services' {
  export const identity: {
    login: (data: any) => void;
    logout;
    account: (url?: string) => void;
  };
}
