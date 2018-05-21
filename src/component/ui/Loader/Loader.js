// import external dependencies

// import internal dependencies
import { Component } from 'lib';

// import assets
import './Loader.scss';

class Loader extends Component {
  render(link) {
    const html = (
      `<div class="loader">
        <div class="loader__ball loader__ball1"></div>
        <div class="loader__ball loader__ball2"></div>
        <div class="loader__ball loader__ball3"></div>
      </div>`
    );
    super.render(link, html);
  }
}

Loader.propTypes = {};

export default Loader;
