// import UserList class
import SendMoney from 'container/SendMoney/SendMoney';
// export default UserList class
// I used `defaultExport` to state that variable name doesn't matter

document.addEventListener('DOMContentLoaded', function () {
  const rootEl = document.getElementById('app');
  const users = [
    {firstname: 'firstname', lastname: 'lastname'},
  ];
  const sendMoney = new SendMoney({users});
  sendMoney.render();
  rootEl.appendChild(sendMoney.element);
  setTimeout(() => {
    sendMoney.setProps({
      users: [
        {firstname: 'firstname', lastname: 'lastname'},
        {firstname: 'firstname', lastname: 'lastname'},
      ],
    });
  }, 2000);
})
;