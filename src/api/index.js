/* eslint-disable indent */
import userJson from './mock/user.json';
import userAccounts from './mock/userAccounts.json';

const apiRoot = '/api/';

export const get = (url) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const exactUrl = `${apiRoot}${url}`;
      switch (true) {
        case /^\/api\/users\/[a-z0-9]+$/.test(exactUrl):
          resolve(userJson);
          return;
        case /^\/api\/users\/[a-z0-9]+\/accounts$/.test(exactUrl):
          resolve(userAccounts);
          return;
        default:
          resolve({});
          return;
      }
    }, 2000);
  });
