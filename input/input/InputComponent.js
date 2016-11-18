import { Component } from 'substance'

class InputComponent extends Component {
  didMount() {
    // Register for model side updates
    this.context.editorSession.onRender('document', this.onContentChange, this, {
      path: [this.props.node.id, 'content']
    })
  }

  // And please always deregister
  dispose() {
    this.context.editorSession.off(this)
  }

  render($$) {
    let el = $$('div').addClass('sc-input-node')
    let input = $$('input').ref('input')
      .val(this.props.node.content)
      .on('change', this.onChange)
    // you should disable the input when the parent asks you to do so
    if (this.props.disabled) {
      input.attr('disabled', true)
    }

    el.append(input)
    return el
  }

  // this is called when the input's content has been changed
  onChange() {
    let editorSession = this.context.editorSession
    let node = this.props.node
    let newVal = this.refs.input.val()
    editorSession.transaction(function(tx) {
      tx.set([node.id, 'content'], newVal)
    })
  }

  // this is called when the model has changed, e.g. on undo/redo
  onContentChange() {
    this.refs.input.val(this.props.node.content)
  }
}

export default InputComponent