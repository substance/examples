import {
  Configurator, EditorSession, ProseEditorPackage
} from 'substance'
import ExampleFigureNode from './ExampleFigureNode'
import ExampleFigureComponent from './ExampleFigureComponent'
import InlineImagePackage from '../inline-node/InlineImagePackage'
import fixture from './fixture'

const { ProseEditor } = ProseEditorPackage

window.onload = function() {
  let cfg = new Configurator()

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
