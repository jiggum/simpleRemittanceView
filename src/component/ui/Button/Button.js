// import external dependencies
import classnames from 'classnames';
// import internal dependencies
import { Component } from 'lib';

// import assets
import './Button.scss';

// return UserList class

export default class Button extends Component {
  /**
   *
   * @param {string} [props.size = null] oneOf['large', 'small', null]
   * @param {string} props.text
   * @param {string} props.class
   * @param {boolean} props.disabled
   * @param {function} props.onClick
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('click', this.onClick);
  }

  update(nextProps) {
    if (this.props.text !== nextProps.text) {
      const buttonTextEl = this.element.getElementsByClassName('Button__text')[0];
      buttonTextEl.innerText = nextProps.text;
    }
    if (this.props.disabled !== nextProps.disabled) {
      if (nextProps.disabled) {
        this.element.classList.add('Button--disabled');
      } else {
        this.element.classList.remove('Button--disabled');
      }
    }
  }

  onClick(e) {
    if (this.props.disabled) return;
    this.props.onClick && this.props.onClick(e);
  }

  render(link) {
    const html = (
      `<div
        class="${classnames(
        'Button',
        {
          [`Button-${this.props.size}`]: this.props.size,
          'Button--disabled': this.props.disabled,
          [this.props.class]: this.props.class,
        })}"
      >
        <span class="Button__hoverSpan"></span>
        <span class="Button__text">${this.props.text}</span>
      </div>`
    );
    super.render(link, html);
  }
}