import { ProseEditor, ContainerEditor } from 'substance'
import TextTools from './TextTools'
import AnnotationTools from './AnnotationTools'

class MinimalEditor extends ProseEditor {

  render($$) {
    let el = $$('div').addClass('sc-minimal-editor')
    let editor = this._renderEditor($$)
    let ScrollPane = this.componentRegistry.get('scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let ContextMenu = this.componentRegistry.get('context-menu')

    let scrollPane = $$(ScrollPane, {
      noStyle: true
    }).append(
      $$('div').addClass('se-minimal-editor-content').append(
        editor
      ),
      // Overlays
      $$(Overlay),
      $$(TextTools),
      $$(AnnotationTools),
      $$(ContextMenu)
    )

    el.append(scrollPane)
    return el
  }

  _renderEditor($$) {
    let configurator = this.getConfigurator()
    return $$(ContainerEditor, {
      disabled: this.props.disabled,
      editorSession: this.editorSession,
      node: this.doc.get('body'),
      commands: configurator.getSurfaceCommandNames(),
      textTypes: configurator.getTextTypes()
    }).ref('body')
  }
}

export default MinimalEditor
