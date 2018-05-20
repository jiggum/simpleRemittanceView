import cloneObject from 'util/cloneObject';

export default class Component {
  constructor(props) {
    this.props = props;
    this.element = null;
    this.isRendered = false;
    this.props = props;
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setProps = this.setProps.bind(this);
    this.createElementFromHTML = this.createElementFromHTML.bind(this);
  }

  componentDidMount() {

  }

  setProps(props) {
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
    this.element = this.createElementFromHTML(html);
    if (link) {
      link(this.element);
      this.componentDidMount();
    }
  }
}