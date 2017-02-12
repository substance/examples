import {
  EditorSession, ProseEditor, ProseEditorConfigurator, ProseEditorPackage
} from 'substance'
import ExpressionPackage from './expression/ExpressionPackage'
import ExpressionReferencePackage from './expression-reference/ExpressionReferencePackage'
import fixture from './fixture'

let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.import(ExpressionPackage)
cfg.import(ExpressionReferencePackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}