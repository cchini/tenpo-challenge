import { account } from './domains/identity/userServices';
import { login, logout } from './domains/identity/loginServices';

const identity = {
  login,
  logout,
  account,
};

export { identity };
export type { UserLogin } from './domains/identity/loginServices';
