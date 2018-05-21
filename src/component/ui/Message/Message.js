// import external dependencies
import classnames from 'classnames';
// import internal dependencies
import { Component } from 'lib';

// import assets
import './Message.scss';

// return UserList class

export default class Message extends Component {
  /**
   *
   * @param {string} props.text innerHtml
   * @param {string} props.class
   */

  update(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.element.innerHTML = nextProps.text;
    }
  }

  render(link) {
    const html = (
      `<div
        class="${classnames(
        'Message',
        {
          [this.props.class]: this.props.class,
        })}"
      >
        ${this.props.text}
      </div>`
    );
    super.render(link, html);
  }
}
