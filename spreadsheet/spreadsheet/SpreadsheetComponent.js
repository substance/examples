import { Component } from 'substance'
import SpreadsheetCellComponent from './SpreadsheetCellComponent'

class SpreadsheetComponent extends Component {

  render($$) {
    let el = $$('table').addClass('sc-spreadsheet')
    let node = this.props.node
    let doc = this.props.node.getDocument()
    let cells = this.props.node.cells
    let rowCount = node.getRowCount()
    let colCount = node.getColCount()
    for (let i = 0; i < rowCount; i++) {
      let rowEl = $$('tr')
      for (let j = 0; j < colCount; j++) {
        let cellId = cells[i][j]
        // Merged cells (cellId is null) are skipped
        if (cellId) {
          let cellNode = doc.get(cellId)
          let cellEl = $$(SpreadsheetCellComponent, {
            node: cellNode,
            disabled: this.props.disabled
          })
          .ref(cellNode.id)
          .on('dblclick', this.onDblClick)

          rowEl.append(cellEl)
        }
      }
      el.append(rowEl)
    }
    return el
  }

  onClick(event) {
    // console.log('Clicked on Table', this.props.node.id, event.target)
  }

  onDblClick(event) {
    event.stopPropagation()
    let comp = Component.unwrap(event.currentTarget)
    if (this.editedCell) {
      this.editedCell.extendProps({
        edit: false
      })
    }
    this.editedCell = comp
    this.editedCell.extendProps({
      edit: true
    })
  }
}

export default SpreadsheetComponent
