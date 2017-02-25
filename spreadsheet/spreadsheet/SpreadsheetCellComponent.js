import { Component } from 'substance'
// import TextPropertyEditor from '../../ui/TextPropertyEditor'

class SpreadsheetCellComponent extends Component {
  render($$) {
    let node = this.props.node
    let el = $$('td').addClass('sc-spreadsheet-cell')
    el.append(
      node.content
      // $$(TextPropertyEditor, {
      //   path: node.getTextPath(),
      //   disabled: this.props.disabled
      // }).ref('editor')
    )
    if (node.rowspan > 0) {
      el.attr('rowspan', node.rowspan)
    }
    if (node.colspan > 0) {
      el.attr('colspan', node.colspan)
    }
    return el
  }

  grabFocus() {
    let node = this.props.node
    this.context.editorSession.setSelection({
      type: 'property',
      path: node.getPath(),
      startOffset: node.getLength(),
      surfaceId: this.refs.editor.id
    })
  }

}

SpreadsheetCellComponent.prototype._isSpreadsheetCellComponent = true

export default SpreadsheetCellComponent
