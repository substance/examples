import Spreadsheet from './Spreadsheet'
import SpreadsheetCell from './SpreadsheetCell'
import SpreadsheetComponent from './SpreadsheetComponent'

export default {
  name: 'table',
  configure: function(config) {
    config.addNode(Spreadsheet)
    config.addNode(SpreadsheetCell)
    config.addComponent('spreadsheet', SpreadsheetComponent)
  }
}
