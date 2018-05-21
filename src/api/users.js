import * as api from 'api';

export const getUsersApi = ({ id }) => {
  return api.get(`users/${id}`);
};

export const getUsersAccountsApi = ({ id }) => {
  return api.get(`users/${id}/accounts`);
};

export const postUsersRemittanceApi = ({ id, amount, corporation }) => {
  return api.get(`users/${id}/remittance`);
}
