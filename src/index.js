// import UserList class
import { getUser, getUsersAccounts } from 'service/user';
import SendMoney from 'container/SendMoney/SendMoney';
import { Loader } from 'component/ui';
// export default UserList class
// I used `defaultExport` to state that variable name doesn't matter

const userId = '817c2a9';

document.addEventListener('DOMContentLoaded', async () => {
  const rootEl = document.getElementById('app');
  const loader = new Loader({});
  loader.render(rootEl.appendChild.bind(rootEl));
  const [user, userAccounts] = await Promise.all([
    getUser({ id: userId }),
    getUsersAccounts({ id: userId }),
  ]);
  rootEl.removeChild(loader.element);
  const sendMoney = new SendMoney({
    user,
    userAccounts
  });
  sendMoney.render(rootEl.appendChild.bind(rootEl));
});