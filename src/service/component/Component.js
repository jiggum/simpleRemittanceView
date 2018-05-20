export default class Component {
  constructor(props) {
    this.props = props;
    this.element = null;
    this.isRendered = false;
    this.props = props;
    this.setProps = this.setProps.bind(this);
    this.createElementFromHTML = this.createElementFromHTML.bind(this);
  }

  setProps(props) {
    this.update(props);
    this.props = props;
  }

  createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  update(nextProps) {
  }

  render(html) {
    this.element = this.createElementFromHTML(html);
  }
}