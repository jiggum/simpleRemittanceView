// import external dependencies
import Swiper from 'swiper/dist/js/swiper.min';

// import internal dependencies
import Component from 'service/component/Component';

// import assets
import 'swiper/dist/css/swiper.css';
import './BankAccountSwiper.scss';

export default class BankAccountSwiper extends Component {
  /**
   *
   * @param {object[]} props.bankAccounts
   */
  constructor(props) {
    super(props);
  }

  initialize() {
    // window.swiper = new Swiper(this.element.getElementsByClassName('swiper-container'), {
    //   pagination: {
    //     el: this.element.getElementsByClassName('swiper-pagination'),
    //     dynamicBullets: true,
    //   },
    // });
    setTimeout(() => {
      window.swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      });
    }, 1000);
  }

  render() {
    const html = (
      `<div class="BankAccountSwiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
            <div class="swiper-slide">Slide 5</div>
            <div class="swiper-slide">Slide 6</div>
            <div class="swiper-slide">Slide 7</div>
            <div class="swiper-slide">Slide 8</div>
            <div class="swiper-slide">Slide 9</div>
            <div class="swiper-slide">Slide 10</div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>`
    );
    super.render(html);
    this.initialize();
  }
}
