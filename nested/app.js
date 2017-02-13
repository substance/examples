import {
  EditorSession, ProseEditor, ProseEditorConfigurator, ProseEditorPackage
} from 'substance'

import fixture from './fixture'
import ContainerPackage from './container/ContainerPackage'


let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage);
cfg.import(ContainerPackage);

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}