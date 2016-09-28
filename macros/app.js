const {
  ProseEditor, ProseEditorConfigurator, DocumentSession,
  ProseEditorPackage, HeadingMacro
} = substance

/*
  Example document
*/
const fixture = function(tx) {
  let body = tx.get('body')
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Type # followed by a space to create a heading!"
  })
  body.show('p1')
  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: ""
  })
  body.show('p2')
}

/*
  Application
*/
let config = {
  name: 'macros-example',
  configure: function(config) {
    config.import(ProseEditorPackage)
    config.addMacro(HeadingMacro)
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
