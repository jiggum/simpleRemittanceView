// import UserList class
import SendMoney from 'container/SendMoney/SendMoney';
// export default UserList class
// I used `defaultExport` to state that variable name doesn't matter

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('app');
  const users = [
    {firstname: 'firstname', lastname: 'lastname'},
  ];
  root.innerHTML = (new SendMoney({users})).render();
})
;