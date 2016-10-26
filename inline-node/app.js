import {
  Component, ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage, InlineNode, InsertInlineNodeCommand, EditInlineNodeCommand,
  AnnotationTool, Tool, deleteSelection, substanceGlobals
} from 'substance'

substanceGlobals.DEBUG_RENDERING = true;

/*
  Node definition
*/
class InlineImage extends InlineNode {}

InlineImage.define({
  type: 'inline-image',
  src: { type: 'string', 'default': './assets/smile.png'}
})

/*
  Node display component
*/
class InlineImageComponent extends Component {
  didMount() {
    this.context.editorSession.onRender('document', this.rerender, this, {
      path: [this.props.node.id, 'src']
    })
  }

  dispose() {
    this.context.editorSession.off(this)
  }

  render($$) {
    let el = $$('img')
      .attr('src', this.props.node.src)
      .addClass('sc-inline-image');
    return el;
  }
}

/*
  Edit the src of an existing inline image
*/
class EditInlineImageTool extends Tool {

  getUrlPath() {
    let propPath = this.constructor.urlPropertyPath
    return [this.props.node.id].concat(propPath)
  }

  render($$) {
    let Input = this.getComponent('input')
    let Button = this.getComponent('button')
    let el = $$('div').addClass('sc-edit-link-tool')
    let urlPath = this.getUrlPath()

    el.append(
      $$(Input, {
        type: 'url',
        path: urlPath,
        placeholder: 'Paste or type an image url'
      }),
      $$(Button, {
        icon: 'delete',
        style: this.props.style
      }).on('click', this.onDelete)
    )
    return el
  }

  onDelete() {
    let editorSession = this.context.editorSession
    editorSession.transaction(function(tx, args) {
      return deleteSelection(tx, args)
    })
  }
}

EditInlineImageTool.urlPropertyPath = ['src']

/*
  Package definition of your inline image plugin
*/
const InlineImagePackage = {
  name: 'inline-image',
  configure: function(config) {
    config.addNode(InlineImage)
    config.addComponent(InlineImage.type, InlineImageComponent)
    config.addCommand('add-inline-image', InsertInlineNodeCommand, {nodeType: InlineImage.type})
    config.addCommand('edit-inline-image', EditInlineNodeCommand, {nodeType: InlineImage.type})
    config.addTool('add-inline-image', AnnotationTool, { toolGroup: 'insert'})
    config.addTool('edit-inline-image', EditInlineImageTool, { toolGroup: 'overlay' })
    config.addIcon('add-inline-image', { 'fontawesome': 'fa-image' })
    config.addLabel('add-inline-image', 'Inline Image')
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
    content: 'Inline Nodes'
  })
  body.show('title')
  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: "This shows an inline image $, which behaves like a character in the text."
  })
  body.show('intro')
  tx.create({
    type: 'inline-image',
    id: 'i1',
    path: ['intro', 'content'],
    startOffset: 27,
    endOffset: 28
  })
  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: "Yours, Michael $, Oliver $, Daniel $."
  })
  tx.create({
    type: 'inline-image',
    id: 'i2',
    src: './assets/michael.jpg',
    path: ['the-end', 'content'],
    startOffset: 15,
    endOffset: 16
  })
  tx.create({
    type: 'inline-image',
    id: 'i3',
    src: './assets/oliver.jpg',
    path: ['the-end', 'content'],
    startOffset: 25,
    endOffset: 26
  })
  tx.create({
    type: 'inline-image',
    id: 'i4',
    src: './assets/daniel.jpg',
    path: ['the-end', 'content'],
    startOffset: 35,
    endOffset: 36
  })
  body.show('the-end')
}

/*
  Application
*/
let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.import(InlineImagePackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
