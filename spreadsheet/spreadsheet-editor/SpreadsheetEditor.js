import { AbstractEditor, Toolbar } from 'substance'
import SpreadsheetComponent from '../spreadsheet/SpreadsheetComponent'

/*
  Sets up a standalone editor UI for spreadsheets.
*/
class SpreadsheetEditor extends AbstractEditor {

  render($$) {
    let SplitPane = this.componentRegistry.get('split-pane')
    let el = $$('div').addClass('sc-prose-editor')
    let toolbar = this._renderToolbar($$)
    let editor = this._renderEditor($$)

    let ScrollPane = this.componentRegistry.get('scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let ContextMenu = this.componentRegistry.get('context-menu')
    let Dropzones = this.componentRegistry.get('dropzones')

    let contentPanel = $$(ScrollPane, {
      name: 'contentPanel',
      contextMenu: this.props.contextMenu || 'native',
      scrollbarPosition: 'right',
      scrollbarType: this.props.scrollbarType,
    }).append(
      editor,
      $$(Overlay),
      $$(ContextMenu),
      $$(Dropzones)
    ).ref('contentPanel')

    el.append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        toolbar,
        contentPanel
      )
    )
    return el
  }

  _renderToolbar($$) {
    return $$('div').addClass('se-toolbar-wrapper').append(
      $$(Toolbar).ref('toolbar')
    )
  }

  _renderEditor($$) {
    return $$(SpreadsheetComponent, {
      disabled: this.props.disabled,
      editorSession: this.editorSession,
      node: this.doc.get('s1')
    }).ref('spreadsheet')
  }
}

export default SpreadsheetEditor
