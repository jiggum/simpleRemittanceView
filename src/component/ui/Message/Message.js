// import external dependencies
import apiCheck from 'api-check';
import classnames from 'classnames';

// import internal dependencies
import { Component } from 'lib';

// import assets
import './Message.scss';

// return UserList class

class Message extends Component {
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

Message.propTypes = {
  text: apiCheck.string,
  class: apiCheck.string.optional,
};

export default Message;
