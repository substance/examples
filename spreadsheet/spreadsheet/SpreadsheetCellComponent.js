import { Component } from 'substance'
// import TextPropertyEditor from '../../ui/TextPropertyEditor'
import SpreadsheetCellEditor from '../spreadsheet-cell-editor/SpreadsheetCellEditor'

class SpreadsheetCellComponent extends Component {
  render($$) {
    let node = this.props.node
    let el = $$('td').addClass('sc-spreadsheet-cell')

    if (this.props.edit) {
      el.addClass('sm-edit')
      el.append(
        $$(SpreadsheetCellEditor, {
          content: node.source
        }).ref('sourceEditor')
      )
    } else {
      // Render value
      el.append(
        $$('div').append(node.value)
      )
    }

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
