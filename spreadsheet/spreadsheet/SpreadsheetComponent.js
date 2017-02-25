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
          }).ref(cellNode.id)
          rowEl.append(cellEl)
        }
      }
      el.append(rowEl)
    }
    el.on('click', this.onClick)
    el.on('dblclick', this.onDblClick)
    return el
  }

  onClick(event) {
    event.stopPropagation()
    // console.log('Clicked on Table', this.props.node.id, event.target)
  }

  // TODO: this should only be used for the initial table state
  onDblClick(event) {
    event.stopPropagation()
    // console.log('DblClicked on Spreadsheet', this.props.node.id, event.target)

    // HACK: assuming that if the event.target has a surface
    // it is a TextPropertyEditor of a cell
    let comp = Component.unwrap(event.target)
    if (comp) {
      let cellComp
      if (comp._isSpreadsheetCellComponent) {
        cellComp = comp
      } else if (comp._isTextPropertyEditor) {
        cellComp = comp.getParent()
      } else if (comp._isTextPropertyComponent) {
        cellComp = comp.getParent().getParent()
      } else {
        console.warn('TODO: find the right cell')
      }
      if (cellComp) {
        cellComp.grabFocus()
      }
    }
  }

  grabFocus() {
    let cellId = this.props.node.cells[0][0]
    if (cellId) {
      let comp = this.refs[cellId]
      comp.grabFocus()
    }
  }
}

SpreadsheetComponent.hasDropzones = true

export default SpreadsheetComponent
