// import external dependencies
import Swiper from 'swiper/dist/js/swiper.min';

// import internal dependencies
import Component from 'service/component/Component';
import BankAccountSwiperSlider from './BankAccountSwiperSlider/BankAccountSwiperSlider';

// import assets
import 'swiper/dist/css/swiper.css';
import './BankAccountSwiper.scss';

export default class BankAccountSwiper extends Component {
  /**
   *
   * @param {object[]} props.bankAccounts
   * @param {function} props.onSlideChangeTransitionEnd
   */
  constructor(props) {
    super(props);
    this.initializeSwiper = this.initializeSwiper.bind(this);
    this.onSlideChangeTransitionEnd = this.onSlideChangeTransitionEnd.bind(this);
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

    const swiperWrapperEl = this.element.getElementsByClassName('swiper-wrapper')[0];
    for(let bankAccount of this.props.bankAccounts) {
      const bankAccountSwiperSlider = new BankAccountSwiperSlider({ bankAccount });
      bankAccountSwiperSlider.render(swiperWrapperEl.appendChild.bind(swiperWrapperEl));
    }

    this.initializeSwiper();
  }
}
