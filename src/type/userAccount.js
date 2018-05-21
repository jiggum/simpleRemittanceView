import apiCheck from 'api-check';

export default apiCheck.shape({
  corporation: apiCheck.shape({
    id: apiCheck.string,
    name: apiCheck.string,
  }),
  account: apiCheck.string,
  deposit: apiCheck.shape({
    amount: apiCheck.oneOfType([apiCheck.number, apiCheck.null]),
    currency: apiCheck.string,
  }),
  fee: apiCheck.number
});
