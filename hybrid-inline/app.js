import {
  ProseEditor, ProseEditorConfigurator, EditorSession, InlineNode,
  ProseEditorPackage, TextPropertyEditor, InlineNodeComponent
} from 'substance'

/*
  Node definition
*/
class HybridInlineNode extends InlineNode {
  getEvaluatedValue() {
    var result
    try {
      result = window.eval(this.value) // eslint-disable-line no-eval
    } catch (err) {
      console.error(err)
      result = "ERROR"
    }
    return result
  }
}

HybridInlineNode.define({
  type: 'hybrid-inline',
  content: { type: 'text', default: ' ' }
})

/*
  Node display component
*/
class HybridInlineComponent extends InlineNodeComponent {

  didMount() {
    super.didMount()
    this.context.editorSession.onRender('document', this.rerender, this, {
      path: [this.props.node.id, 'content']
    })
  }

  dispose() {
    super.dispose()
    this.context.editorSession.off(this)
  }

  getClassNames() {
    // ATTENTION: ATM it is necessary to add .sc-inline-node
    return 'sc-hybrid-inline sc-inline-node'
  }

  renderContent($$) {
    var node = this.props.node
    var el = $$(TextPropertyEditor, {
      disabled: this.isDisabled(),
      tagName: 'span',
      path: [node.id, 'content'],
      withoutBreak: true
    }).ref('content')
    return el
  }
}

/*
  Package definition of your inline image plugin
*/
const HybridInlinePackage = {
  name: 'hybrid-inline',
  configure: function(config) {
    config.addNode(HybridInlineNode)
    config.addComponent(HybridInlineNode.type, HybridInlineComponent)
    config.addLabel('hybrid-inline.content', 'Hybrid Inline')
  }
}

/*
  Example document
*/
const fixture = function(tx) {
  let body = tx.get('body')
  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Inline Property Editor'
  })
  body.show('title')
  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "This shows an $, which renders a property editor",
      "in the flow of the text, creating an interface similar to a regular annotations.",
      "Still, in contrast to an annotation the content is owned by the inline node."
    ].join(' ')
  })
  tx.create({
    type: 'hybrid-inline',
    id: 'i1',
    path: ['intro', 'content'],
    startOffset: 14,
    endOffset: 15,
    content: 'inline property',
  })
  body.show('intro')
}

/*
  Application
*/

let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.import(HybridInlinePackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
