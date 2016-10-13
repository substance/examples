import {
  Configurator, DocumentSession, ProseEditor, ProseEditorPackage,
  Tool
} from 'substance'

import SpellCheckPackage from './spell-check/SpellCheckPackage'
import fixture from './fixture'

const config = {
  name: 'spellcheck-example',
  configure: function(config) {
    config.import(ProseEditorPackage)
    config.import(SpellCheckPackage)
  }
}
const cfg = new Configurator().import(config)

window.onload = function() {
  const doc = cfg.createArticle(fixture)
  let documentSession = new DocumentSession(doc)
  ProseEditor.mount({
    documentSession: documentSession,
    configurator: cfg,
    scrollbarType: 'substance'
  }, document.body)
}
