// import external dependencies
// import internal dependencies
import Component from 'service/component/Component';

// import assets
import './UserList.scss';

// return UserList class

export class UserList extends Component {
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
      `<div class="UserList">
        <ul>
            ${this.props.users.map(user => this.renderUser(user)).join('')}
        </ul>
      </div>`
    );
  }
}
