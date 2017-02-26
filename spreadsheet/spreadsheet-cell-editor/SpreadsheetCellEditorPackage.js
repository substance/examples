import {
  Document, BasePackage
} from 'substance'

import SourceText from './SourceText'

export default {
  name: 'spreadsheet-cell-editor',
  configure: function(config) {
    config.defineSchema({
      name: 'spreadsheet-cell-editor',
      ArticleClass: Document,
      defaultTextType: 'paragraph'
    })
    config.import(BasePackage)
    config.addNode(SourceText)
  }
}
