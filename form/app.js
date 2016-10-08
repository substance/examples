const {
  ProseEditor, ProseEditorConfigurator, DocumentSession, DocumentNode,
  ProseEditorPackage, BlockNodeComponent, TextPropertyEditor
} = substance

/*
  Node definition
*/
class EntityNode extends DocumentNode {}

EntityNode.define({
  type: 'entity',
  name: 'text',
  description: 'text'
})

/*
  Node display component
*/
class EntityComponent extends BlockNodeComponent {
  render($$) {
    let el = $$('div').addClass('sc-entity')

    el.append(
      $$('div').ref('title').addClass('se-title').append('Entity')
    )

    let table = $$('table')
    table.append(
      $$('colgroup').append(
        $$('col').addClass('se-label-col'),
        $$('col').addClass('se-value-col')
      )
    )

    let nameRow = $$('tr')
    nameRow.append($$('td').addClass('se-label').append('Name:'))
    nameRow.append($$('td').addClass('se-value').append(
      $$(TextPropertyEditor, {
        path: [this.props.node.id, 'name'],
        disabled: this.props.disabled
      }).ref('nameEditor')
    ))
    table.append(nameRow)
    table.append($$('tr').addClass('se-separator'))

    let descriptionRow = $$('tr')
    descriptionRow.append($$('td').addClass('se-label').append('Description:'))
    descriptionRow.append($$('td').addClass('se-value').append(
      $$(TextPropertyEditor, {
        path: [this.props.node.id, 'description'],
        disabled: this.props.disabled
      }).ref('descriptionEditor')
    ))
    table.append(descriptionRow)
    el.append(table)
    return el
  }
}

/*
  Package definition of your plugin
*/
const EntityPackage = {
  name: 'entity',
  configure: function(config) {
    config.addNode(EntityNode)
    config.addComponent(EntityNode.type, EntityComponent)
    config.addLabel('entity', 'Entity')
    config.addLabel('entity.name', 'Name')
    config.addLabel('entity.description', 'Description')
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
    content: 'Embedded Forms'
  })
  body.show('title')
  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "It is very easy to add a node with a form editing interface.",
      "For example this is very useful to create meta-data editors."
    ].join(' ')
  })
  body.show('intro')
  tx.create({
    type: 'entity',
    id: 'entity',
    name: 'Foo',
    description: 'Bar'
  })
  body.show('entity')
  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: "That's it."
  })
  body.show('the-end')
}

/*
  Application
*/
let config = {
  name: 'form-example',
  configure: function(config) {
    config.import(ProseEditorPackage)
    config.import(EntityPackage)
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
