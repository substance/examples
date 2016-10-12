import {
  Configurator, DocumentSession, ProseEditor, ProseEditorPackage,
  Tool
} from 'substance'

import fixture from './fixture'
import AddMarkersCommand from './AddMarkersCommand'

const config = {
  name: 'marker-example',
  configure: function(config) {
    config.import(ProseEditorPackage)
    config.addCommand('add-markers', AddMarkersCommand)
    config.addTool('add-markers', Tool)
    config.addIcon('add-markers', { 'fontawesome': 'fa-asterisk' })
    config.addLabel('add-markers', 'Add Markers')
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
