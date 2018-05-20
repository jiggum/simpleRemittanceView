// import external dependencies
// import internal dependencies
import Component from 'service/component/Component';

// import assets
import './SendMoney.scss';

export class SendMoneyView extends Component {
  /**
   *
   * @param {object[]} props.users
   * @param {string} props.users[].firstname
   * @param {string} props.users[].lastname
   */
  constructor(props) {
    super(props);
  }

  renderUser(user) {
    return (
      `<li>${user.firstname} ${user.lastname}</li>`
    );
  }

  update(nextProps) {
    this.element.getElementsByTagName('ul')[0].innerHTML = `${nextProps.users.map(user => this.renderUser(user)).join('')}`;
  }

  render() {
    const html = (
      `<div class="SendMoney">
        <ul>
            ${this.props.users.map(user => this.renderUser(user)).join('')}
        </ul>
      </div>`
    );
    super.render(html);
  }
}

const SendMoney = SendMoneyView;

export default SendMoney;
