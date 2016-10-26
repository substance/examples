import {
  ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage, HeadingMacro
} from 'substance'

import MinimalEditor from './MinimalEditor'
import fixture from './fixture'

/*
  Application
*/

let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.addMacro(HeadingMacro)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  MinimalEditor.mount({
    editorSession: editorSession
  }, document.body)
}
