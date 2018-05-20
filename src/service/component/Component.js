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
    this.update(props, this.state);
    this.props = props;
  }

  setState(state) {
    this.update(this.props, state);
    this.state = Object.assign(cloneObject(this.state), state);
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
    link(this.element);
    this.componentDidMount();
  }
}