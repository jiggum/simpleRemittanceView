// import external dependencies
// import internal dependencies
import Component from 'service/component/Component';

// import assets
import './SendMoney.scss';

export class SendMoneyView extends Component {
  /**
   *
   * @param {Obejct[]} props.users
   * @param {string} props.users[].firstname
   * @param {string} props.users[].lastname
   */
  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
  }

  renderUser(user) {
    return (
      `<li>${user.firstname} ${user.lastname}</li>`
    );
  }

  render() {
    // el = super.render();
    return (
      `<div class="SendMoney">
        <ul>
            ${this.props.users.map(user => this.renderUser(user)).join('')}
        </ul>
      </div>`
    );
  }
}

const SendMoney = SendMoneyView;

export default SendMoney;
