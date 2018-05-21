// import external dependencies
import Swiper from 'swiper/dist/js/swiper.min';
import apiCheck from 'api-check';

// import internal dependencies
import { Component } from 'lib';
import BankAccountSwiperSlider from './BankAccountSwiperSlider/BankAccountSwiperSlider';
import { userAccountType } from 'type';

// import assets
import 'swiper/dist/css/swiper.css';
import './BankAccountSwiper.scss';

class BankAccountSwiper extends Component {
  constructor(props) {
    super(props);
    this.bankAccountSwiperSliders = [];
    this.initializeSwiper = this.initializeSwiper.bind(this);
    this.onSlideChangeTransitionEnd = this.onSlideChangeTransitionEnd.bind(this);
  }

  componentDidMount() {
    const swiperWrapperEl = this.element.getElementsByClassName('swiper-wrapper')[0];
    for(let bankAccount of this.props.bankAccounts) {
      const bankAccountSwiperSlider = new BankAccountSwiperSlider({ bankAccount });
      bankAccountSwiperSlider.render(swiperWrapperEl.appendChild.bind(swiperWrapperEl));
      this.bankAccountSwiperSliders.push(bankAccountSwiperSlider);
    }

    this.initializeSwiper();
  }

  initializeSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
      on: {
        slideChangeTransitionEnd: this.onSlideChangeTransitionEnd,
      }
    });
    this.bankAccountSwiperSliders.forEach(bankAccountSwiperSlider => {
      bankAccountSwiperSlider.setProps({
        swiper: this.swiper,
      });
    });
  }

  onSlideChangeTransitionEnd() {
    this.props.onSlideChangeTransitionEnd(this.swiper.activeIndex);
  }

  render(link) {
    const html = (
      `<div class="BankAccountSwiper">
        <div class="BankAccountSwiper__title">출금계좌</div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>`
    );
    super.render(link, html);
  }
}

BankAccountSwiper.propTypes = {
  bankAccounts: apiCheck.arrayOf(userAccountType),
  onSlideChangeTransitionEnd: apiCheck.func,
};

export default BankAccountSwiper;