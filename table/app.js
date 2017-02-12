import {
  ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage
} from 'substance'

import fixture from './fixture'

let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
