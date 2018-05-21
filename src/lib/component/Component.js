import cloneObject from 'util/cloneObject';
import apiCheck from 'api-check';

export default class Component {
  constructor(props) {
    this.props = props;
    this.element = null;
    this.props = props;
    this.state = {};
    this.checkPropTypes = this.checkPropTypes.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setProps = this.setProps.bind(this);
    this.setState = this.setState.bind(this);
    this.createElementFromHTML = this.createElementFromHTML.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  checkPropTypes() {
    const error = apiCheck.shape(this.constructor.propTypes)(this.props);
    if (error) {
      // eslint-disable-next-line no-console
      console.trace(error);
    }
  }

  componentDidMount() {
  }

  setProps(props) {
    this.checkPropTypes();
    const nextProps = Object.assign(cloneObject(this.props), props);
    this.element && this.update(nextProps, this.state);
    this.props = nextProps;
  }

  setState(state) {
    const nextState = Object.assign(cloneObject(this.state), state);
    this.element && this.update(this.props, nextState);
    this.state = nextState;
  }

  createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  update(nextProps, nextState) {
  }

  render(link, html) {
    this.checkPropTypes();
    this.element = this.createElementFromHTML(html);
    if (link) {
      link(this.element);
      this.componentDidMount();
    }
  }
}
