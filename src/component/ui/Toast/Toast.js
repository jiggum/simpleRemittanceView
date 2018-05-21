// import external dependencies
import apiCheck from 'api-check';
import classnames from 'classnames';

// import internal dependencies
import { Component } from 'lib';

// import assets
import './Toast.scss';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    };
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isHidden: false,
      });
    }, 0);
    // if duration < 0, toast only be hide when call close func directly
    if (this.props.duration >= 0) {
      setTimeout(this.hide, this.props.duration);
    }
  }
  
  update(nextProps, nextState) {
    if (this.state.isHidden !== nextState.isHidden) {
      if (nextState.isHidden) {
        this.element.classList.add('Toast--hidden');
      } else {
        this.element.classList.remove('Toast--hidden');
      }
    }
  }

  hide() {
    this.element.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'transform') {
        this.props.toastSpan.remove();
      }
    });
    this.setState({
      isHidden: true,
    });
  }

  render(link) {
    const html = (
      `<div class="${classnames(
        'Toast',
        `Toast--${this.props.type}`,
        {
          'Toast--hidden': this.state.isHidden,
        })}">
        ${this.props.text}
      </div>`
    );
    super.render(link, html);
  }
}

Toast.propTypes = {
  text: apiCheck.string,
  type: apiCheck.oneOf(['success', 'error']),
  duration: apiCheck.number,
  toastSpan: apiCheck.object,
};

let toastRoot;

export default class ToastCall {
  initToastRoot() {
    toastRoot = document.createElement('span');
    toastRoot.className = 'ToastRoot';
    document.body.appendChild(toastRoot);
  }

  showToast(text, duration = 3000, type) {
    if (!toastRoot) this.initToastRoot();
    const toastSpan = document.createElement('span');
    toastRoot.appendChild(toastSpan);
    const toast = new Toast({ text, duration, type, toastSpan });
    toast.render(toastSpan.appendChild.bind(toastSpan));

    const close = () => setTimeout(toast.hide, 0);
    return close;
  }

  static success(text, duration) {
    const toastCall = new ToastCall();
    return toastCall.showToast(text, duration, 'success');
  }
  static error(text, duration) {
    const toastCall = new ToastCall();
    return toastCall.showToast(text, duration, 'error');
  }
}