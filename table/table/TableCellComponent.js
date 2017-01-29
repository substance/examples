import { Component, TextPropertyComponent } from 'substance'

class TableCellComponent extends Component {
  render($$) {
    let node = this.props.node
    let el = $$('td').addClass('sc-table-cell')
    el.attr('contenteditable', true)
    el.append(
      $$(TextPropertyComponent, {
        path: node.getTextPath()
      })
    )
    if (node.rowspan > 0) {
      el.attr('rowspan', node.rowspan)
    }
    if (node.colspan > 0) {
      el.attr('colspan', node.colspan)
    }
    return el
  }
}

export default TableCellComponent
