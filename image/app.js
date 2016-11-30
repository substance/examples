import {
  ProseEditor, ProseEditorConfigurator, EditorSession,
  ProseEditorPackage, ImagePackage, PersistencePackage
} from 'substance'

import fixture from './fixture'

class SaveHandlerStub {

  /*
    Saving a document involves two steps.
    - syncing files (e.g. images) with a backend
    - storing a snapshot of the document's content (e.g. a XML serialization)
  */
  saveDocument(params) {
    console.info('Simulating save ...', params)

    return params.fileManager.sync()
    .then(() => {
      // Here you would run a converter (HTML/XML) usually
      // and send the result to a REST endpoint.
      console.info('Creating document snapshot...')
    })

  }
}

let cfg = new ProseEditorConfigurator()
cfg.import(ProseEditorPackage)
cfg.import(ImagePackage)
// Enable save button
cfg.import(PersistencePackage)
cfg.setSaveHandlerClass(SaveHandlerStub)

window.onload = function() {
  let doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  ProseEditor.mount({
    editorSession: editorSession
  }, document.body)
}
