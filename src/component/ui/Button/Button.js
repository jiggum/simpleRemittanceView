// import external dependencies
import classnames from 'classnames';
import apiCheck from 'api-check';

// import internal dependencies
import { Component } from 'lib';

// import assets
import './Button.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('click', this.onClick);
  }

  update(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.element.innerText = nextProps.text;
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
        ${this.props.text}
      </div>`
    );
    super.render(link, html);
  }
}

Button.propTypes = {
  text: apiCheck.string,
  size: apiCheck.oneOf(['large', 'small']).optional,
  class: apiCheck.string.optional,
  disabled: apiCheck.bool.optional,
  onClick: apiCheck.func.optional,
};

export default Button;
