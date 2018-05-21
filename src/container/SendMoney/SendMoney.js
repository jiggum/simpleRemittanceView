// import external dependencies
import apiCheck from 'api-check';

// import internal dependencies
import { Component } from 'lib';
import { remit } from 'service/user';
import { userAccountType, userType } from 'type';
import MoneyInput from 'component/MoneyInput/MoneyInput';
import BankAccountSwiper from 'component/BankAccountSwiper/BankAccountSwiper';
import { Button, Message, Toast } from 'component/ui';
import { digitRegex } from 'util/regex';
import { formatMoneySeparated } from 'util/string';

// import assets
import closeImg from 'asset/img/close.svg';
import './SendMoney.scss';

export class SendMoneyView extends Component {

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
      title: `보낼 금액 (쵀대 ${formatMoneySeparated(this.props.user.limit.remain.toString())}원)`,
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

    // Message
    this.message = new Message({
      text: this.renderMessage(this.props, this.state),
      class: 'SendMoney__message',
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

  validateMoneyInput(e, amountMoneyToSend) {
    if(!digitRegex.test(e.key)) {
      // prevent input text's default changing event
      e.preventDefault();
      throw new Error('숫자만 입력하실 수 있습니다.');
    }
    if(amountMoneyToSend > this.props.user.limit.remain) {
      // prevent input text's default changing event
      e.preventDefault();
      throw new Error(`1일 ${formatMoneySeparated(this.props.user.limit.daily.toString())}원 까지만 이체할 수 있습니다.`);
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

  async onSubmit() {
    const payload = {
      id: this.props.user.id,
      amount: this.state.amountMoneyToSend,
      corporation: {
        id: this.state.currentUserAccount.corporation.id,
      }
    };
    this.sendButton.setProps({
      onLoading: true,
    });
    try {
      await remit(payload);
      Toast.success('송금이 완료되었습니다.');
      // eslint-disable-next-line no-console
      console.log(`Request Payload : ${JSON.stringify(payload)}`);
    } catch (e) {
      console.trace(e);
      Toast.error('송금 요청이 실패하였습니다.');
    }
    this.sendButton.setProps({
      onLoading: false,
    });
  }

  renderMessage(props, state) {
    if (!state.currentUserAccount) return;
    if (state.currentUserAccount.corporation.id === 'toss') {
      const holdAmount = state.currentUserAccount.deposit.amount || 0;
      if (state.amountMoneyToSend > holdAmount) {
        return 'Toss 계좌를 채우고, 무료로 송금하세요';
      }
      return 'Toss계좌 / <span class="color-highlight">수수료 무료</span>';
    } else {
      return `무료 송금 <span class="color-highlight">${props.user.remittanceLimit.monthly}회 남음</span>월 ${props.user.remittanceLimit.remain}회`;
    }
  }

  update(nextProps, nextState) {
    const isValid = this.validate(nextState);
    if (this.validate(this.state) !== isValid) {
      this.sendButton.setProps({
        disabled: !isValid,
      });
    }
    const newMessageText = this.renderMessage(nextProps, nextState);
    if (this.renderMessage(this.props, this.state) !== newMessageText) {
      this.message.setProps({
        text: newMessageText,
      });
    }
    if (this.state.amountMoneyToSend <= 0 && nextState.amountMoneyToSend > 0) {
      const sendMoneyContentEl = this.element.getElementsByClassName('SendMoney__content')[0];
      this.bankAccountSwiper.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));
      this.message.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));
      this.sendButton.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));
    } else if (this.state.amountMoneyToSend > 0 && nextState.amountMoneyToSend <= 0) {
      const sendMoneyContentEl = this.element.getElementsByClassName('SendMoney__content')[0];
      sendMoneyContentEl.removeChild(this.bankAccountSwiper.element);
      sendMoneyContentEl.removeChild(this.message.element);
      sendMoneyContentEl.removeChild(this.sendButton.element);
    }
  }

  render(link) {
    const html = (
      `<div class="SendMoney">
        <!--<img src="${closeImg}" />-->
        <div class="SendMoney__title">송금하기</div>
        <div class="SendMoney__content">
        </div>
      </div>`
    );
    super.render(link, html);
  }
}

SendMoneyView.propTypes = {
  user: userType,
  userAccounts: apiCheck.arrayOf(userAccountType),
};

const SendMoney = SendMoneyView;

export default SendMoney;
