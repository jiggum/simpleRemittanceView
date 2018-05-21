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
import getNumberWithUpperBound from 'util/getNumberWithUpperBound';

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
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.calcInputWidth = this.calcInputWidth.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onInputContainerClick = this.onInputContainerClick.bind(this);
    this.renderWarnMessage = this.renderWarnMessage.bind(this);
  }

  componentDidMount() {
    const inputContainerEl = this.element.getElementsByClassName('MoneyInput__inputContainer')[0];
    inputContainerEl.addEventListener('mousedown', this.onInputContainerClick);
    this.inputSizer = this.element.getElementsByClassName('MoneyInput__inputSizer')[0];
    this.inputEl = this.element.getElementsByClassName('MoneyInput__input')[0];
    this.inputEl.addEventListener('keydown', this.onKeyDown);
    this.inputEl.addEventListener('keyup', this.onKeyUp);
    this.inputEl.addEventListener('focus', this.onInputFocus);
    this.inputEl.addEventListener('blur', this.onInputBlur);
    this.calcInputWidth();
  }

  update(nextProps, nextState) {
    if (this.state.message !== nextState.message) {
      const messageEl = this.element.getElementsByClassName('MoneyInput__message')[0];
      messageEl.innerHTML = nextState.warn ? this.renderWarnMessage(nextState.message) : nextState.message;
    }
  }

  onInputFocus() {
    this.inputSizer.classList.add('MoneyInput__inputSizer--borderBlink');
  }

  onInputBlur() {
    this.inputSizer.classList.remove('MoneyInput__inputSizer--borderBlink');
    this.setState({
      message: formatMoneyKo(this.state.amountMoneyToSend.toString()),
      warn: false,
    });
  }

  updateInput(amountMoneyToSend) {
    this.props.onKeyDown(amountMoneyToSend);
    // prevent input text's default changing event
    this.inputEl.value = formatMoneySeparated(amountMoneyToSend.toString());
    this.calcInputWidth();
  }

  calcInputWidth() {
    // dynamic input width
    const inputSizer = this.element.getElementsByClassName('MoneyInput__inputSizer')[0];
    inputSizer.innerText = this.inputEl.value;
    this.inputEl.style.width = inputSizer.offsetWidth + 2;
  }


  onKeyDown(e) {
    let amountMoneyToSend = this.state.amountMoneyToSend;
    let amountMoneyToSendStr = amountMoneyToSend.toString();
    let _amountMoneyToSendStr;
    let _amountMoneyToSend;
    try {
      const previousAmountMoneyToSendStr = symmetryformatMoneySeparated(this.inputSizer.innerText);
      switch(e.keyCode) {
      // backspace
      case 8:
        _amountMoneyToSendStr = previousAmountMoneyToSendStr.substr(0, previousAmountMoneyToSendStr.length -1) || '0';
        amountMoneyToSend = getNumberWithUpperBound(parseInt(_amountMoneyToSendStr), this.props.maxValue);
        amountMoneyToSendStr = amountMoneyToSend.toString();
        break;
      // enter
      case 13:
        this.inputEl.blur();
        return;
      default:
        if(!isPrintableKeyCode(e.keyCode)) return;
        _amountMoneyToSendStr = previousAmountMoneyToSendStr + e.key;
        _amountMoneyToSend = parseInt(_amountMoneyToSendStr);
        amountMoneyToSend = getNumberWithUpperBound(_amountMoneyToSend, this.props.maxValue);
        amountMoneyToSendStr = amountMoneyToSend.toString();
        // if is not valid, throw error
        // validate with input value (not adjusted)
        this.props.validate && this.props.validate(e, _amountMoneyToSend);
      }
      e.preventDefault();
      this.updateInput(amountMoneyToSend);
      this.setState({
        amountMoneyToSend: amountMoneyToSend,
        message: formatMoneyKo(amountMoneyToSendStr),
        warn: false,
      });
    } catch (error) {
      e.preventDefault();
      this.updateInput(amountMoneyToSend);
      this.setState({
        amountMoneyToSend: amountMoneyToSend,
        message: error.message,
        warn: true,
      });
    }
  }

  vibrateMessage() {
    const message = this.element.getElementsByClassName('MoneyInput__message')[0];
    message.classList.remove('MoneyInput__message--animation');
    this.vibrateMessageTimeout && clearTimeout(this.vibrateMessageTimeout);
    this.vibrateMessageTimeout = setTimeout(() =>{
      message.classList.add('MoneyInput__message--animation');
    }, 100);
  }

  onInputContainerClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const inputValueLength = this.inputEl.value.length;
    this.inputEl.focus();
    this.inputEl.setSelectionRange(inputValueLength, inputValueLength);
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
  maxValue: apiCheck.number,
};

export default MoneyInput;
