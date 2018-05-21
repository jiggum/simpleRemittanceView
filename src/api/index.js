/* eslint-disable indent */
import userApiResponseMock from './mock/user.json';
import userAccountsApiResponseMock from './mock/userAccounts.json';
import remittanceApiResponseMock from './mock/remittance.json';
import wait from 'util/wait';

const apiRoot = '/api/';

export const get = async (url) => {
  await wait(1500);
  const exactUrl = `${apiRoot}${url}`;
  let res;
  switch (true) {
    case /^\/api\/users\/[a-z0-9]+$/.test(exactUrl):
      res = userApiResponseMock;
      break;
    case /^\/api\/users\/[a-z0-9]+\/accounts$/.test(exactUrl):
      res = userAccountsApiResponseMock;
      break;
    default:
      res = {
        status: 200,
        statusText: 'OK',
        data: null,
      };
      break;
  }
  return apiResponseInterCepter(res);
};

export const post = async (url, payload) => {
  await wait(1500);
  // throw error randomly
  if (Math.random() > 0.8) throw Error('Randomly Generated Error');
  const exactUrl = `${apiRoot}${url}`;
  let res;
  switch (true) {
    case /^\/api\/users\/[a-z0-9]+\/remittance/.test(exactUrl):
      res = remittanceApiResponseMock;
      break;
    default:
      res = {
        status: 200,
        statusText: 'OK',
        data: null,
      };
      break;
  }
  return apiResponseInterCepter(res);
}

function apiResponseInterCepter(res) {
  if (res.status !== 200) {
    throw res;
  }
  return res
}