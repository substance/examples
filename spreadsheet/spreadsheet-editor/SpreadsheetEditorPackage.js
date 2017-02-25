import { Document, BasePackage } from 'substance'
import SpreadsheetPackage from '../spreadsheet/SpreadsheetPackage'

export default {
  name: 'prose-editor',
  configure: function(config) {
    config.defineSchema({
      name: 'spreadsheet',
      ArticleClass: Document
    })
    config.import(BasePackage)
    config.import(SpreadsheetPackage)
  }
}
