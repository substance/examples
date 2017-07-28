import {
  Configurator, EditorSession,
  ProseEditorPackage, ContainerAnnotationPackage
} from 'substance'

const { ProseEditor } = ProseEditorPackage
const { ContainerAnnotation, ContainerAnnotationCommand } = ContainerAnnotationPackage

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
    config.addCommand('highlight', ContainerAnnotationCommand, {nodeType: 'highlight', commandGroup: 'annotations'})
    config.addIcon('highlight', { 'fontawesome': 'fa-pencil' })
  }
}

/*
  Application
*/
let cfg = new Configurator()
cfg.import(ProseEditorPackage)
cfg.import(ContainerAnnotationPackage)
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