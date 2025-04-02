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

declare module '@tenpo/services' {
  export const identity: {
    login: (data: any) => void;
    logout;
    account: () => void;
  };
  export const coingecko: {
    getCoins: (page: number, size: number) => any;
  };
  export const random: {
    getUsers: (page: number, size: number) => any;
  };

  export interface Name {
    title: string;
    first: string;
    last: string;
  }

  export interface Street {
    number: number;
    name: string;
  }

  export interface Coordinates {
    latitude: string;
    longitude: string;
  }

  export interface Timezone {
    offset: string;
    description: string;
  }

  export interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
  }

  export interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }

  export interface DateInfo {
    date: string;
    age: number;
  }

  export interface ID {
    name: string;
    value: string | null;
  }

  export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
  }

  export interface User {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: DateInfo;
    registered: DateInfo;
    phone: string;
    cell: string;
    id: ID;
    picture: Picture;
    nat: string;
  }

  export interface RandomInfoPage {
    seed?: string;
    results?: number;
    page?: number;
    version?: string;
  }

  export type UserList = User[];
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
    useIsMobile: () => { isMobile: boolean };
  };
}
