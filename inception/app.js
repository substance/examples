const {
  Component, ContainerEditor, DocumentNode, DocumentSession, ProseEditor, ProseEditorConfigurator, ProseEditorPackage
} = substance

/*
  Node display component
*/
class RecursiveContainerComponent extends Component {

  shouldRerender() {
    return false
  }

  render($$) {
    let doc = this.props.node.getDocument()
    let el = $$('div').addClass('sc-container')
    let body = doc.get('body')

    let level = 0
    let surfaceParent = this.context.surfaceParent
    if (surfaceParent._isIsolatedNodeComponent) {
      level = surfaceParent._getLevel()
    }

    if (level < 7) {
      el.append(
        $$(ContainerEditor, {
          name: this.props.node.id,
          node: body
        }).ref('editor')
      )
    } else {
      el.append($$('img').attr({
        src: 'http://www.indiewire.com/wp-content/uploads/2014/05/the-terminator.jpg?w=780',
        title: 'The Terminator',
        alt: 'The Terminator'
      }))
    }
    return el
  }

}

RecursiveContainerComponent.fullWidth = true

/*
  Node definition
*/
class RecursiveNode extends DocumentNode {}

RecursiveNode.define({
  type: 'recursive',
  nodeId: 'id'
})

/*
  Package definition of your plugin
*/
const RecursivePackage = {
  name: 'inception',
  configure: function(config) {
    config.addNode(RecursiveNode)
    config.addComponent(RecursiveNode.type, RecursiveContainerComponent)
  }
}

/*
  Example document
*/
const fixture = function(tx) {
  var body = tx.get('body')

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Inception'
  })
  body.show('title')

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "In this document there is one node which is displaying the document's content itself again",
      "up to a certain level where it ends with -- The Terminator."
    ].join(' ')
  })
  body.show('intro')

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: [
      "This is way too crazy."
    ].join(' ')
  })

  tx.create({
    id: 'inception',
    type: 'recursive',
    nodeId: 'body'
  })
  body.show('inception')

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
      "It really is."
    ].join('')
  })
  body.show('the-end')
}

/*
  Application
*/
let config = {
  name: 'inception-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(RecursivePackage);
  }
}
let configurator = new ProseEditorConfigurator().import(config)

window.onload = function() {
  let doc = configurator.createArticle(fixture)
  let documentSession = new DocumentSession(doc)
  ProseEditor.mount({
    documentSession: documentSession,
    configurator: configurator
  }, document.body)
}