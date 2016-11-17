import {
  ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage, ImagePackage, PersistencePackage
} from 'substance'

import fixture from './fixture'

/*
  Application
*/
let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.import(ImagePackage)
cfg.import(PersistencePackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
