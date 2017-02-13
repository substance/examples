import {
  ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage, substanceGlobals
} from 'substance'

import InlineImagePackage from './InlineImagePackage'
import fixture from './fixture'

substanceGlobals.DEBUG_RENDERING = true;


window.onload = function() {
  let cfg = new ProseEditorConfigurator()
  cfg.import(ProseEditorPackage)
  cfg.import(InlineImagePackage)

  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
