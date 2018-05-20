// import external dependencies
// import internal dependencies
import Component from 'service/component/Component';
import {
  formatMoneySeparated,
  symmetryformatMoneySeparated,
  formatMoneyKo,
} from 'util/string';

// import assets
import './MoneyInput.scss';

// return UserList class

export default class MoneyInput extends Component {
  /**
   *
   * @param {string} props.title
   * @param {string} props.initialValue
   * @param {function} props.onKeyDown
   * @param {function} props.validate
   */
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      warn: false,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.renderWarnMessage = this.renderWarnMessage.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('keydown', this.onKeyDown);
    this.element.getElementsByClassName('MoneyInput__input')[0].addEventListener('mousedown', this.onInputClick);
  }

  update(nextProps, nextState) {
    if (this.state.message !== nextState.message) {
      const messageEl = this.element.getElementsByClassName('MoneyInput__message')[0];
      messageEl.innerHTML = nextState.warn ? this.renderWarnMessage(nextState.message) : nextState.message;
    }
  }

  onKeyDown(e) {
    try {
      let amountMoneyToSendStr;
      const previousAmountMoneyToSendStr = symmetryformatMoneySeparated(e.target.value);
      switch(e.keyCode) {
      case 8:
        // backspace
        amountMoneyToSendStr = previousAmountMoneyToSendStr.substr(0, previousAmountMoneyToSendStr.length -1) || '0';
        break;
      default:
        amountMoneyToSendStr = previousAmountMoneyToSendStr + e.key;
        // if is not valid, throw error
        this.props.validate && this.props.validate(e);
      }
      this.props.onKeyDown(parseInt(amountMoneyToSendStr));
      // prevent input text's default changing event
      e.preventDefault();
      e.target.value = formatMoneySeparated(amountMoneyToSendStr);
      this.setState({
        message: formatMoneyKo(amountMoneyToSendStr),
        warn: false,
      });
    } catch (e) {
      this.setState({
        message: e.message,
        warn: true,
      });
    }
  }

  onInputClick(e) {
    e.preventDefault();
    const inputValueLength = e.target.value.length;
    e.target.focus();
    e.target.setSelectionRange(inputValueLength, inputValueLength);
  }

  renderWarnMessage(message) {
    return `<span class="color-warn">${message}</span>`;
  }

  render(link) {
    const html = (
      `<div class="MoneyInput">
        <div class="MoneyInput__title">${this.props.title}</div>
        <div class="MoneyInput__inputContainer">
            <input class="MoneyInput__input" type="text" value="${this.props.initialValue}"/>
            <div class="MoneyInput__inputUnit">원</div>
        </div>
        <div class="MoneyInput__message">${this.state.message || ''}</div>
      </div>`
    );
    super.render(link, html);

  }
}
