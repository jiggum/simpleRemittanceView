import { getUsersApi, getUsersAccountsApi, postUsersRemittanceApi } from 'api/users';

export const getUser = async ({ id }) => {
  const res = await getUsersApi({ id });
  return res.data;
};

export const getUsersAccounts = async ({ id }) => {
  const res = await getUsersAccountsApi({ id });
  return res.data;
};

export const remit = async ({ id, amount, corporation }) => {
  await postUsersRemittanceApi({ id, amount, corporation });
};