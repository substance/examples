import { Component } from 'substance'

class InlineImageComponent extends Component {
  didMount() {
    this.context.editorSession.onRender('document', this.rerender, this, {
      path: [this.props.node.id, 'src']
    })
  }

  dispose() {
    this.context.editorSession.off(this)
  }

  render($$) {
    let el = $$('img')
      .attr('src', this.props.node.src)
      .addClass('sc-inline-image');
    return el;
  }
}

export default InlineImageComponent