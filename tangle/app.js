import {
  EditorSession, Configurator, ProseEditorPackage
} from 'substance'
import ExpressionPackage from './expression/ExpressionPackage'
import ExpressionReferencePackage from './expression-reference/ExpressionReferencePackage'
import fixture from './fixture'

const { ProseEditor } = ProseEditorPackage

let cfg = new Configurator()
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
