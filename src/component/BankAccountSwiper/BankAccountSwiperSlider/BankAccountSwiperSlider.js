// import external dependencies
import apiCheck from 'api-check';

// import internal dependencies
import { Component } from 'lib';
import corporationMap from 'general/constant/corporationMap';
import { formatMoneySeparated } from 'util/string';
import { userAccountType } from 'type';

// import assets
import 'swiper/dist/css/swiper.css';
import './BankAccountSwiperSlider.scss';

class BankAccountSwiperSlider extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('click', this.onClick);
  }

  onClick() {
    if (this.element.classList.contains('swiper-slide-next')) {
      this.props.swiper.slideNext();
    }
    if (this.element.classList.contains('swiper-slide-prev')) {
      this.props.swiper.slidePrev();
    }
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

BankAccountSwiperSlider.propTypes = {
  bankAccount: userAccountType,
  swiper: apiCheck.object.optional,
};

export default BankAccountSwiperSlider;