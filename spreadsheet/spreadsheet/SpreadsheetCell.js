import { DocumentNode } from 'substance'

class SpreadsheetCell extends DocumentNode {}

SpreadsheetCell.schema = {
  type: 'spreadsheet-cell',
  source: 'string',
  value: { type: 'string', default: '' },
  rowspan: { type: 'number', default: 0 },
  colspan: { type: 'number', default: 0 }
}

export default SpreadsheetCell
