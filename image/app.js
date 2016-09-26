const {
  ProseEditor, ProseEditorConfigurator, DocumentSession,
  ProseEditorPackage, ImagePackage
} = substance

/*
  Example document
*/
const fixture = function(tx) {
  let body = tx.get('body')
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Insert a new image using the image tool."
  })
  body.show('p1')
  tx.create({
    id: 'i1',
    type: 'image',
    src: "http://substance.io/images/stencila.gif"
  })
  body.show('i1')
  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: "Please note that images are not actually uploaded in this example. You would need to provide a custom file client that talks to an image store. See FileClientStub which reveals the API you have to implement."
  })
  body.show('p2')
}


/*
  Application
*/
let config = {
  name: 'image-example',
  configure: function(config) {
    config.import(ProseEditorPackage)
    config.import(ImagePackage)
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
