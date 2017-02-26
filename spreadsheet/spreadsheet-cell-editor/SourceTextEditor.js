import { AbstractEditor, TextPropertyEditor } from 'substance'

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
