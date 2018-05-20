// import external dependencies
// import internal dependencies
import Component from 'service/component/Component';
import MoneyInput from 'component/MoneyInput/MoneyInput';
import BankAccountSwiper from 'component/BankAccountSwiper/BankAccountSwiper';
import { Button } from 'component/ui';
import { digitRegex } from 'util/regex';

// import assets
import closeImg from 'asset/img/close.svg';
import './SendMoney.scss';

export class SendMoneyView extends Component {
  /**
   *
   * @param {object} props.user
   * @param {object[]} props.userAccounts
   */
  constructor(props) {
    super(props);
    this.state = {
      amountMoneyToSend: 0,
      currentUserAccount: this.props.userAccounts.length > 0 ? this.props.userAccounts[0] : null,
    };
    this.onKeyDownMoneyInput = this.onKeyDownMoneyInput.bind(this);
    this.validateMoneyInput = this.validateMoneyInput.bind(this);
    this.onSlideChangeTransitionEnd = this.onSlideChangeTransitionEnd.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const sendMoneyContentEl = this.element.getElementsByClassName('SendMoney__content')[0];

    // MoneyInput
    this.moneyInput = new MoneyInput({
      title: '보낼 금액',
      initialValue: '0',
      onKeyDown: this.onKeyDownMoneyInput,
      validate: this.validateMoneyInput,
    });
    this.moneyInput.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));

    // BankAccountSwiper
    this.bankAccountSwiper = new BankAccountSwiper({
      bankAccounts: this.props.userAccounts,
      onSlideChangeTransitionEnd: this.onSlideChangeTransitionEnd,
    });

    // SendButton
    this.sendButton = new Button({
      size: 'large',
      text: '보내기',
      class: 'SendMoney__sendBtn',
      disabled: !this.validate(this.state),
      onClick: this.onSubmit,
    });
  }

  onKeyDownMoneyInput(amountMoneyToSend) {
    this.setState({
      amountMoneyToSend: amountMoneyToSend,
    });
  }

  validateMoneyInput(e) {
    if(!digitRegex.test(e.key)) {
      // prevent input text's default changing event
      e.preventDefault();
      throw new Error('숫자만 입력하실 수 있습니다.');
    }
  }

  onSlideChangeTransitionEnd(activeIndex) {
    this.setState({
      currentUserAccount: this.props.userAccounts[activeIndex],
    });
  }

  validate(state) {
    let holdAmount = 0;
    if (state.currentUserAccount) {
      holdAmount = state.currentUserAccount.deposit.amount || 0;
    }
    return state.amountMoneyToSend > 0 &&
      (state.amountMoneyToSend <= holdAmount ||
        state.currentUserAccount.corporation.id !== 'toss');
  }

  update(nextProps, nextState) {
    const isValid = this.validate(nextState);
    if (this.validate(this.state) !== isValid) {
      this.sendButton.setProps({
        disabled: !isValid,
      });
    }
    if (this.state.amountMoneyToSend <= 0 && nextState.amountMoneyToSend > 0) {
      const sendMoneyContentEl = this.element.getElementsByClassName('SendMoney__content')[0];
      this.bankAccountSwiper.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));
      this.sendButton.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));
    } else if (this.state.amountMoneyToSend > 0 && nextState.amountMoneyToSend <= 0) {
      const sendMoneyContentEl = this.element.getElementsByClassName('SendMoney__content')[0];
      sendMoneyContentEl.removeChild(this.bankAccountSwiper.element);
      sendMoneyContentEl.removeChild(this.sendButton.element);
    }
  }

  onSubmit() {
    console.log(`보낼금액 : ${this.state.amountMoneyToSend}`);
  }

  render(link) {
    const html = (
      `<div class="SendMoney">
        <!--<img src="${closeImg}" />-->
        <div class="SendMoney__content">
        </div>
      </div>`
    );
    super.render(link, html);
  }
}

const SendMoney = SendMoneyView;

export default SendMoney;
