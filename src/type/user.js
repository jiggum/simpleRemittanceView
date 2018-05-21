import apiCheck from 'api-check';

export default apiCheck.shape({
  id: apiCheck.string,
  name: apiCheck.string,
  limit: apiCheck.shape({
    daily: apiCheck.number,
    remain: apiCheck.number
  }),
  remittanceLimit: apiCheck.shape({
    monthly: apiCheck.number,
    remain: apiCheck.number,
  })
});
