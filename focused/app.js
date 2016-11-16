import {
  Component, ProseEditor, DocumentNode, ProseEditorConfigurator,
  EditorSession, ProseEditorPackage,
} from 'substance'

/*
  Node definition
*/

class Alien extends DocumentNode {}

Alien.define({
  type: 'alien',
  mood: { type: 'string', default: 'normal' }
})

const _moods = ['normal', 'angry', 'excited', 'sad', 'sick']

/*
  Node display component
*/
class AlienComponent extends Component {

  didMount() {
    this.context.editorSession.onRender('document', this.rerender, this, {
      path: [this.props.node.id, 'mood']
    })
  }

  dispose() {
    this.context.editorSession.off(this)
  }

  render($$) {
    let el = $$('div').addClass('sc-alien sg-hide-selection')
    el.append(
      $$('img').attr('height', 100).attr('src', 'assets/alien.svg')
    )
    if (this.props.node.mood) {
      el.addClass('sm-' + this.props.node.mood)
    }
    // only render the over when not disabled
    if (!this.props.disabled) {
      let overlay = $$('div').addClass('se-overlay').append(
        $$('div').addClass('se-controls').append(
          $$('button').append('Click Here').on('mousedown', this.onMousedown)
        )
      )
      el.append(overlay)
    }
    return el
  }

  getDocument() {
    return this.props.node.getDocument()
  }

  onMousedown(event) {
    event.preventDefault()
    event.stopPropagation()

    let surface = this.context.surface
    let node = this.props.node

    let mood = node.mood || 'normal'
    let idx = _moods.indexOf(mood)
    idx = (idx+1) % _moods.length
    mood = _moods[idx]
    surface.transaction(function(tx) {
      tx.set([node.id, 'mood'], mood)
    })
    this.rerender()
  }
}

/*
  Package definition of your inline image plugin
*/
const AlienPackage = {
  name: 'alien',
  configure: function(config) {
    config.addNode(Alien)
    config.addComponent(Alien.type, AlienComponent)
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
    content: 'Focused Element'
  })
  body.show('title')
  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "This shows a custom node which exposes a UI only when focused."
    ].join(' ')
  })
  body.show('intro')
  tx.create({
    type: 'alien',
    id: 'alien'
  })
  body.show('alien')
  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
      "That's it."
    ].join('')
  })
  body.show('the-end')
}

/*
  Application
*/
let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.import(AlienPackage)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}

