import {
  Configurator, EditorSession,
  ProseEditorPackage, substanceGlobals
} from 'substance'

const { ProseEditor } = ProseEditorPackage

import InlineImagePackage from './InlineImagePackage'
import fixture from './fixture'

substanceGlobals.DEBUG_RENDERING = true;


window.onload = function() {
  let cfg = new Configurator()
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
