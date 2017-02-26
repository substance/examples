import { DocumentNode } from 'substance'

class SpreadsheetCell extends DocumentNode {}

SpreadsheetCell.schema = {
  type: 'spreadsheet-cell',
  source: 'string',
  rowspan: { type: 'number', default: 0 },
  colspan: { type: 'number', default: 0 }
}

export default SpreadsheetCell
