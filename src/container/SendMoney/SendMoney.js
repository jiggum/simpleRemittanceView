// import external dependencies
// import internal dependencies
import Component from 'service/component/Component';
import MoneyInput from 'component/MoneyInput/MoneyInput';
import BankAccountSwiper from 'component/BankAccountSwiper/BankAccountSwiper';
import { digitRegex } from 'util/regex';

// import assets
import closeImg from 'asset/img/close.svg';
import './SendMoney.scss';

export class SendMoneyView extends Component {
  /**
   *
   * @param {object[]} props.users
   * @param {string} props.users[].firstname
   * @param {string} props.users[].lastname
   */
  constructor(props) {
    super(props);
    this.state = {
      amountMoneyToSend: 0,
    };
    this.onKeyDownMoneyInput = this.onKeyDownMoneyInput.bind(this);
    this.validateMoneyInput = this.validateMoneyInput.bind(this);
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

  render(link) {
    const html = (
      `<div class="SendMoney">
        <img src="${closeImg}" />
        <div class="SendMoney__content">
        </div>
      </div>`
    );
    super.render(link, html);

    const sendMoneyContentEl = this.element.getElementsByClassName('SendMoney__content')[0];

    // MoneyInput
    const moneyInput = new MoneyInput({
      title: '보낼 금액',
      initialValue: '0',
      onKeyDown: this.onKeyDownMoneyInput,
      validate: this.validateMoneyInput,
    });
    moneyInput.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));

    // BankAccountSwiper
    const bankAccountSwiper = new BankAccountSwiper({
      bankAccounts: [
        {
          "corporation": {
            "id": "Shinhan",
            "name": " "
          },
          "account": "4648*****84347",
          "deposit": {
            "amount": null,
            "currency": ""
          },
          "fee" : 500
        },
        {
          "corporation": {
            "id": "toss",
            "name": "Toss "
          },
          "account": "",
          "deposit": {
            "amount": 141000,
            "currency": ""
          },
          "fee": 0
        }
      ],
    });
    bankAccountSwiper.render(sendMoneyContentEl.appendChild.bind(sendMoneyContentEl));
  }
}

const SendMoney = SendMoneyView;

export default SendMoney;
