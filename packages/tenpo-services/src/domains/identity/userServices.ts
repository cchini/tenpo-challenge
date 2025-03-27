import { rest, type AxiosCall } from '@tenpo/utils';
import { AccountState, setAccountUser } from '@tenpo/states';

const identityUrl = process?.env?.REACT_APP_IDENTITY_API;
const identityAccountPath = `${identityUrl}/api/account`;

export const account = async (): Promise<AccountState> => {
  try {
    const { get } = rest.axiosServices;
    const { callEndpoint } = rest.useFetchAndLoad();
    const call: AxiosCall<any> = get(
      identityAccountPath,
      { 'content-type': 'application/json' },
      {},
      false,
    );
    const response = await callEndpoint(call);
    if (response.status === 200) {
      const data = response.data;
      const userAccount: AccountState = {
        user: data?.user,
        usename: data?.user,
        email: data?.email,
        permissions: data?.permissions,
      };
      setAccountUser(userAccount);
      return userAccount;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
