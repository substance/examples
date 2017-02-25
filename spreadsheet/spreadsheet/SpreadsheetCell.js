import { TextNode } from 'substance'

class SpreadsheetCell extends TextNode {}

SpreadsheetCell.schema = {
  type: 'spreadsheet-cell',
  rowspan: { type: 'number', default: 0 },
  colspan: { type: 'number', default: 0 }
}

export default SpreadsheetCell
