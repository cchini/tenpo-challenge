import { rest, type AxiosCall } from '@tenpo/utils';
import { loginStates, logoutStates } from '@tenpo/states';

const identityUrl = process?.env?.REACT_APP_IDENTITY_API;
const identityLoginPath = `${identityUrl}/api/login`;
const identityLogoutPath = `${identityUrl}/api/logout`;

export interface UserLogin {
  user: string;
  password: string;
}

export const login = async (data: UserLogin) => {
  try {
    const { post } = rest.axiosServices;
    const { callEndpoint } = rest.useFetchAndLoad();
    const call: AxiosCall<any> = post(
      identityLoginPath,
      { 'content-type': 'application/json' },
      data,
      {},
      false,
    );
    const response = await callEndpoint(call);
    if (response.status === 200) {
      loginStates(response.data.token);
    } else {
      logoutStates();
    }
  } catch (error) {
    logoutStates();
    console.debug('ERROR', error);
  }
};

export const logout = () => {
  logoutStates();
};
