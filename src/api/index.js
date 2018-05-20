/* eslint-disable indent */
import userJson from './mock/user.json';
import userAccounts from './mock/userAccounts.json';

const apiRoot = '/api/';

export const get = (url) => {
  const exactUrl = `${apiRoot}${url}`;
  switch (true) {
    case /^\/api\/users\/[a-z0-9]+$/.test(exactUrl):
      return new Promise(function(resolve) {
        resolve(userJson);
      });
    case /^\/api\/users\/[a-z0-9]+\/accounts$/.test(exactUrl):
      return new Promise(function(resolve) {
        resolve(userAccounts);
      });
    default:
      return new Promise(function(resolve) {
        resolve({});
      });
  }
};
