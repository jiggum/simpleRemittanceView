/* eslint-disable */
const assert = require('assert');
const userJson = require('./mock/user.json');
const userAccountsJson = require('./mock/userAccounts.json');
const usersApi = require('./users');

describe('API Users', function() {
  it('user', async () => {
    const res = await usersApi.getUsers({id: '817c2a9'});
    assert.equal(JSON.stringify(res), JSON.stringify(userJson));
  });
  it('userAccounts', async () => {
    const res = await usersApi.getUsersAccount({id: '817c2a9'});
    assert.equal(JSON.stringify(res), JSON.stringify(userAccountsJson));
  });
});