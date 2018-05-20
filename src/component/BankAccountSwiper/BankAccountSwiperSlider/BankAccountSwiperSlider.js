// import external dependencies
import Swiper from 'swiper/dist/js/swiper.min';

// import internal dependencies
import Component from 'service/component/Component';
import corporationMap from 'general/constant/corporationMap';
import { formatMoneySeparated } from 'util/string';

// import assets
import 'swiper/dist/css/swiper.css';
import './BankAccountSwiperSlider.scss';

export default class BankAccountSwiperSlider extends Component {
  /**
   *
   * @param {object} props.bankAccount
   */
  constructor(props) {
    super(props);
    this.renderDescription = this.renderDescription.bind(this);
  }

  componentDidMount() {
  }

  renderDescription() {
    if (this.props.bankAccount.corporation.id === 'toss') {
      const amountMoney = this.props.bankAccount.deposit.amount;
      return `${formatMoneySeparated(amountMoney.toString())} 원`;
    }
    return `${corporationMap[this.props.bankAccount.corporation.id].titleShort} ${this.props.bankAccount.account}`;
  }

  render(link) {
    const html = (
      `<div class="BankAccountSwiperSlider swiper-slide">
        <div class="BankAccountSwiperSlider__content">
          <div class="BankAccountSwiperSlider__title">
            ${corporationMap[this.props.bankAccount.corporation.id].titleMain}
          </div>
          <div class="BankAccountSwiperSlider__description">
            ${this.renderDescription()}
          </div>
        </div>
      </div>`
    );
    super.render(link, html);
  }
}
