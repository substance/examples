import {
  ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage
} from 'substance'
import ExampleFigureNode from './ExampleFigureNode'
import ExampleFigureComponent from './ExampleFigureComponent'
import InlineImagePackage from '../inline-node/InlineImagePackage'
import fixture from './fixture'


window.onload = function() {
  let cfg = new ProseEditorConfigurator()

  cfg.import(ProseEditorPackage)
  cfg.import(InlineImagePackage)

  cfg.addNode(ExampleFigureNode)
  cfg.addComponent(ExampleFigureNode.type, ExampleFigureComponent)

  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
