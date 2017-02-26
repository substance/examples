import { AbstractEditor, TextPropertyEditor } from 'substance'

/**
  Configurable ProseEditor component

  @example

  ```js
  const cfg = new Configurator()
  cfg.import(ProseEditorPackage)
  cfg.import(SuperscriptPackage)

  window.onload = function() {
    let doc = configurator.createArticle(fixture)
    let editorSession = new EditorSession(doc, {
      configurator: configurator
    })
    RichTextAreaEditor.mount({
      editorSession: editorSession
    }, document.body)
  }
  ```
*/

export default class SourceTextEditor extends AbstractEditor {

  render($$) {
    let el = $$('div').addClass('sc-source-text-editor')

    el.append(
      $$(TextPropertyEditor, {
        name: 'sourceTextEditor',
        path: ['source', 'content'],
        commands: []
      })
    )
    return el
  }

}
