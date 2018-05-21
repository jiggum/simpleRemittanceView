// import external dependencies
import classnames from 'classnames';
import apiCheck from 'api-check';

// import internal dependencies
import { Component } from 'lib';
import { Loader } from 'component/ui';

// import assets
import './Button.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.toLoading = this.toLoading.bind(this);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('click', this.onClick);
    if (this.props.onLoading) {
      this.toLoading();
    }
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
    if (this.props.onLoading !== nextProps.onLoading) {
      if (nextProps.onLoading) {
        this.toLoading();
      } else {
        this.element.classList.remove('Button--loading');
        this.element.innerHTML = this.props.text;
      }
    }
  }

  toLoading() {
    if(!this.loader) {
      this.loader = new Loader({});
    }
    this.element.classList.add('Button--loading');
    this.element.innerHTML = '';
    this.loader.render(this.element.appendChild.bind(this.element));
  }

  onClick(e) {
    if (this.props.disabled || this.props.onLoading) return;
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
          'Button--loading': this.props.onLoading,
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
  onLoading: apiCheck.bool.optional,
  onClick: apiCheck.func.optional,
};

export default Button;
