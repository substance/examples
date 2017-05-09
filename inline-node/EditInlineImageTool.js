import { Tool } from 'substance'

/*
  Edit the src of an existing inline image
*/
class EditInlineImageTool extends Tool {

  getUrlPath() {
    let propPath = this.constructor.urlPropertyPath
    let nodeId = this.props.commandState.nodeId
    return [nodeId].concat(propPath)
  }

  render($$) {
    let Input = this.getComponent('input')
    let el = $$('div').addClass('sc-edit-link-tool')
    let urlPath = this.getUrlPath()

    el.append(
      $$(Input, {
        type: 'url',
        path: urlPath,
        placeholder: 'Paste or type an image url'
      })
    )
    return el
  }
}

EditInlineImageTool.urlPropertyPath = ['src']

export default EditInlineImageTool
