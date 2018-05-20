import * as api from 'api';

export const getUsers = ({ id }) => {
  return api.get(`users/${id}`);
};

export const getUsersAccount = ({ id }) => {
  return api.get(`users/${id}/accounts`);
};
