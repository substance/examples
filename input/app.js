import {
  ProseEditor, Configurator, EditorSession, ProseEditorPackage
} from 'substance'

import InputPackage from './input/InputPackage'
import fixture from './fixture'

let cfg = new Configurator()
cfg.import(ProseEditorPackage)
cfg.import(InputPackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
