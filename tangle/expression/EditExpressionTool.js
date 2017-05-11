import { DefaultDOMElement, Tool } from 'substance'
import Expression from './Expression'

class EditExpressionTool extends Tool {

  render($$) {
    let node = this.props.commandState.node
    let Button = this.getComponent('button')

    let el = $$('div').addClass('sc-edit-expression-tool')
    el.append(
      $$(Button, {
        icon: 'edit-value',
        theme: this.props.theme
      }).attr('title', 'Toggle mode')
        .on('click', this._onToggle)
    )
    if (node.variable) {
      el.append($$('div').addClass('se-separator'))
      el.append(
        $$(Button, {
          icon: 'drag-value',
          theme: this.props.theme
        }).attr('title', 'Change Value')
          .on('mousedown', this._startDragValue)
      )
    }
    el.append($$('div').addClass('se-separator'))
    el.append(
      $$(Button, {
        icon: 'delete',
        theme: this.props.theme
      }).attr('title', 'Remove')
        .on('click', this._onDelete)
    )
    return el
  }

  _onToggle() {
    this.props.commandState.node.emit('toggle:showSource')
  }

  _onDelete() {
    let node = this.props.commandState.node
    let editorSession = this.context.editorSession
    editorSession.transaction((tx) => {
      tx.selection = node.getSelection()
      tx.deleteSelection()
    })
  }

  _startDragValue(event) {
    let node = this.props.commandState.node
    let wdoc = DefaultDOMElement.wrapNativeElement(window.document)
    wdoc.on('mousemove', this._onDragValue, this)
    wdoc.on('mouseup', this._finishDragValue, this)
    this._startX = event.clientX
    this._value = node.getEvaluatedValue()
  }

  _onDragValue(event) {
    let node = this.props.commandState.node
    // console.log('UPDATING VALUE')
    let diff = event.clientX - this._startX
    if (node.units) {
      diff *= Expression.UNITS[node.units]
    }
    let prelimValue = this._value + diff
    // console.log('#### ', prelimValue)
    node._preliminaryValue = prelimValue
    node.getDocument().emit('expression:update')
  }

  _finishDragValue() {
    let wdoc = DefaultDOMElement.wrapNativeElement(window.document)
    wdoc.off(this)

    let node = this.props.commandState.node
    let editorSession = this.context.editorSession
    let newVal = node._preliminaryValue
    delete node._preliminaryValue
    if (node.value !== newVal) {
      editorSession.transaction((tx) => {
        tx.set([node.id, 'value'], newVal)
      })
    }
    node.getDocument().emit('expression:update')
  }

}

export default EditExpressionTool
