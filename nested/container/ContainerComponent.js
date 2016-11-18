import { Component, ContainerEditor } from 'substance'

class ContainerComponent extends Component {
  render($$) {
    let el = $$('div').addClass('sc-container')
    el.append(
      $$(ContainerEditor, {
        node: this.props.node
      }).ref('editor')
    )
    return el
  }
}

ContainerComponent.fullWidth = true

export default ContainerComponent