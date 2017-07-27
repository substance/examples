import {
  ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage,
  ContainerAnnotation, ContainerAnnotationCommand, AnnotationTool
} from 'substance'

import fixture from './fixture'

/*
  An annotation that can span over multiple paragraphs
*/
class Highlight extends ContainerAnnotation {}

Highlight.type = 'highlight'

/*
  Package definition of your inline image plugin
*/
const HighlightPackage = {
  name: 'highlight',
  configure: function(config) {
    config.addNode(Highlight)
    config.addCommand('highlight', ContainerAnnotationCommand, {nodeType: 'highlight'})
    config.addTool('highlight', AnnotationTool, { toolGroup: 'default' })
    config.addIcon('highlight', { 'fontawesome': 'fa-pencil' })
  }
}

/*
  Application
*/
let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.import(HighlightPackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  window.app = ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}