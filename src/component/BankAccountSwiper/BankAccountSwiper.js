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
    this.initializeSwiper = this.initializeSwiper.bind(this);
  }

  componentDidMount() {
    this.initializeSwiper();
  }

  initializeSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });
  }

  render(link) {
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
    super.render(link, html);
  }
}
