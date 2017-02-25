import {
  Configurator, EditorSession
} from 'substance'

import fixture from './fixture'

import SpreadsheetEditor from './spreadsheet-editor/SpreadsheetEditor'
import SpreadsheetEditorPackage from './spreadsheet-editor/SpreadsheetEditorPackage'

let cfg = new Configurator()
cfg.import(SpreadsheetEditorPackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  SpreadsheetEditor.mount({
    editorSession: editorSession
  }, document.body)
}
