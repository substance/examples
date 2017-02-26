import {
  Component, Configurator, EditorSession
} from 'substance'
import SourceTextEditor from './SourceTextEditor'
import SpreadsheetCellEditorPackage from './SpreadsheetCellEditorPackage'

class SpreadsheetCellEditor extends Component {
  constructor(...args) {
    super(...args)
    this.cfg = new Configurator().import(SpreadsheetCellEditorPackage)
    this._initDoc(this.props)
  }

  didMount() {
    this.registerHandlers()
  }

  didUpdate() {
    this.registerHandlers()
  }

  registerHandlers() {

  }

  unregisterHandlers() {

  }

  dispose() {
    this.unregisterHandlers()
  }


  willReceiveProps(props) {
    this.dispose()
    this.empty()
    this._initDoc(props)
  }

  _initDoc(props) {
    this.doc = this.cfg.createArticle(function(tx) {
      tx.create({
        id: 'source',
        type: 'source-text',
        content: props.content
      })
    })

    this.editorSession = new EditorSession(this.doc, {
      configurator: this.cfg
    })
  }

  render($$) {
    let el = $$('div').addClass('sc-spreadsheet-cell-editor')
    el.append(
      $$(SourceTextEditor, {
        editorSession: this.editorSession,
        editorId: this.props.editorId
      }).ref('editor')
    )
    return el
  }

  getText() {
    return this.doc.get('source').content
  }
}

export default SpreadsheetCellEditor
