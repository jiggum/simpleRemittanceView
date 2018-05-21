// import external dependencies
import apiCheck from 'api-check';

// import internal dependencies
import { Component } from 'lib';
import {
  formatMoneySeparated,
  symmetryformatMoneySeparated,
  formatMoneyKo,
} from 'util/string';
import isPrintableKeyCode from 'util/isPrintableKeyCode';

// import assets
import './MoneyInput.scss';

// return UserList class

class MoneyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountMoneyToSend: 0,
      message: null,
      warn: false,
    };
    this.vibrateMessage = this.vibrateMessage.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.calcInputWidth = this.calcInputWidth.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onInputContainerClick = this.onInputContainerClick.bind(this);
    this.renderWarnMessage = this.renderWarnMessage.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('keydown', this.onKeyDown);
    const inputContainerEl = this.element.getElementsByClassName('MoneyInput__inputContainer')[0];
    const inputEl = this.element.getElementsByClassName('MoneyInput__input')[0];
    inputContainerEl.addEventListener('mousedown', this.onInputContainerClick);
    inputEl.addEventListener('blur', this.onInputBlur);
    this.calcInputWidth();
  }

  update(nextProps, nextState) {
    if (this.state.message !== nextState.message) {
      const messageEl = this.element.getElementsByClassName('MoneyInput__message')[0];
      messageEl.innerHTML = nextState.warn ? this.renderWarnMessage(nextState.message) : nextState.message;
    }
  }

  onInputBlur() {
    this.setState({
      message: formatMoneyKo(this.state.amountMoneyToSend.toString()),
      warn: false,
    });
  }

  calcInputWidth() {
    const inputSizer = this.element.getElementsByClassName('MoneyInput__inputSizer')[0];
    const input = this.element.getElementsByClassName('MoneyInput__input')[0];
    inputSizer.innerText = input.value;
    input.style.width = inputSizer.offsetWidth + 2;
  }

  onKeyDown(e) {
    let amountMoneyToSend = this.state.amountMoneyToSend;
    try {
      let amountMoneyToSendStr;
      const previousAmountMoneyToSendStr = symmetryformatMoneySeparated(e.target.value);
      switch(e.keyCode) {
      // backspace
      case 8:
        amountMoneyToSendStr = previousAmountMoneyToSendStr.substr(0, previousAmountMoneyToSendStr.length -1) || '0';
        amountMoneyToSend = parseInt(amountMoneyToSendStr);
        break;
      // enter
      case 13:
        const input = this.element.getElementsByClassName('MoneyInput__input')[0];
        input.blur();
        return;
      default:
        if(!isPrintableKeyCode(e.keyCode)) return;
        amountMoneyToSendStr = previousAmountMoneyToSendStr + e.key;
        amountMoneyToSend = parseInt(amountMoneyToSendStr);
        // if is not valid, throw error
        this.props.validate && this.props.validate(e, amountMoneyToSend);
      }
      this.props.onKeyDown(amountMoneyToSend);
      // prevent input text's default changing event
      e.preventDefault();
      e.target.value = formatMoneySeparated(amountMoneyToSendStr);
      // dynamic input width
      this.calcInputWidth();
      this.setState({
        amountMoneyToSend: amountMoneyToSend,
        message: formatMoneyKo(amountMoneyToSendStr),
        warn: false,
      });
    } catch (e) {
      this.vibrateMessage();
      this.setState({
        amountMoneyToSend: amountMoneyToSend,
        message: e.message,
        warn: true,
      });
    }
  }

  vibrateMessage() {
    const message = this.element.getElementsByClassName('MoneyInput__message')[0];
    message.classList.remove('MoneyInput__message--animation');
    setTimeout(() =>{
      message.classList.add('MoneyInput__message--animation');
    });
  }

  onInputContainerClick(e) {
    const inputEl = this.element.getElementsByClassName('MoneyInput__input')[0];
    e.preventDefault();
    e.stopPropagation();
    const inputValueLength = inputEl.value.length;
    inputEl.focus();
    inputEl.setSelectionRange(inputValueLength, inputValueLength);
  }

  renderWarnMessage(message) {
    return `<span class="color-warn">${message}</span>`;
  }

  render(link) {
    const html = (
      `<div class="MoneyInput">
        <div class="MoneyInput__title">${this.props.title}</div>
        <div class="MoneyInput__inputContainer">
            <span class="MoneyInput__inputSizer"></span>
            <input class="MoneyInput__input" type="text" value="${this.props.initialValue}"/>
            <div class="MoneyInput__inputUnit">원</div>
        </div>
        <div class="MoneyInput__message">${this.state.message || ''}</div>
      </div>`
    );
    super.render(link, html);
  }
}

MoneyInput.propTypes = {
  title: apiCheck.string,
  initialValue: apiCheck.string,
  onKeyDown: apiCheck.func,
  validate: apiCheck.func,
};

export default MoneyInput;
