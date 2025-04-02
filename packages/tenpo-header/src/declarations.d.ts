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

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@tenpo/states' {
  export const identity$;
  export const account$;
  export const preferences$;
  export const setUrlApi;
  export const loginStates;
  export const logoutStates;
  export const setAccountUser;
  export const getAccountUser;
  export const getToken;
  export const getStorageToken;
  export const getStorageLocale;
  export const setLocaleUser;
  export interface AccountState {
    user: string;
    usename: string;
    email: string;
    permissions: string[];
  }
}

declare module '@tenpo/ui' {
  export const Button;
  export const Input;
  export const Icon;
  export const Card;
}

declare module '@tenpo/utils' {
  export const eventHandlers: {
    useDebounce: <T>(
      initialValue: T,
      delay?: number,
    ) => {
      value: T;
      setValue: React.Dispatch<React.SetStateAction<T>>;
      debouncedValue: T;
    };
  };
}

declare module '@tenpo/services' {
  // Define the types for UserLogin and AxiosCall (if not already defined elsewhere)
  export interface UserLogin {
    user: string;
    password: string;
  }

  // AxiosCall is typically a generic type, you need to define it (this is a simple example).
  export type AxiosCall<T> = (
    url: string,
    headers: object,
    data: object,
    params: object,
    withCredentials: boolean,
  ) => Promise<T>;

  // Define the structure of the response from the API call (customize based on your needs).
  export interface ApiResponse {
    status: number;
    data: {
      token: string;
    };
  }

  export const identity: {
    login: (data: UserLogin) => Promise<number | any>;
    logout: () => void;
    account: () => void;
  };
}
