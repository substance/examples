import { Tool } from 'substance'

/*
  Edit the src of an existing inline image
*/
class EditInlineImageTool extends Tool {

  getUrlPath() {
    let propPath = this.constructor.urlPropertyPath
    return [this.props.node.id].concat(propPath)
  }

  render($$) {
    let Input = this.getComponent('input')
    let Button = this.getComponent('button')
    let el = $$('div').addClass('sc-edit-link-tool')
    let urlPath = this.getUrlPath()

    el.append(
      $$(Input, {
        type: 'url',
        path: urlPath,
        placeholder: 'Paste or type an image url'
      }),
      $$(Button, {
        icon: 'delete',
        style: this.props.style
      }).on('click', this.onDelete)
    )
    return el
  }

  onDelete() {
    let editorSession = this.context.editorSession
    editorSession.transaction(function(tx) {
      tx.deleteSelection()
    })
  }
}

EditInlineImageTool.urlPropertyPath = ['src']

export default EditInlineImageTool