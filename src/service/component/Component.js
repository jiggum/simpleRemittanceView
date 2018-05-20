export default class Component {
  constructor(props) {
    this.props = props;
    this.render = this.render.bind(this);
  }

  render() {
    return '';
  }
}