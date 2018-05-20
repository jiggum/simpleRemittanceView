// import UserList class
import { getUsers, getUsersAccounts } from 'api/users';
import SendMoney from 'container/SendMoney/SendMoney';
// export default UserList class
// I used `defaultExport` to state that variable name doesn't matter

const userId = '817c2a9';

document.addEventListener('DOMContentLoaded', async () => {
  const rootEl = document.getElementById('app');
  const [user, userAccounts] = await Promise.all([
    getUsers({ id: userId }),
    getUsersAccounts({ id: userId }),
  ]);
  const sendMoney = new SendMoney({
    user,
    userAccounts
  });
  sendMoney.render(rootEl.appendChild.bind(rootEl));
});