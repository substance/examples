import { Component, TextPropertyEditor } from 'substance'

class ExampleFigureComponent extends Component {

  render($$) {
    let node = this.props.node
    let el = $$('div').addClass('sc-figure')
    el.append(
      $$('img').ref('image')
        .attr('src', node.url)
        .attr('draggable', true)
    )
    el.append($$(TextPropertyEditor, {
      path: [node.id, 'caption'],
      disabled: this.props.disabled
    }).ref('caption'))
    return el
  }

}

ExampleFigureComponent.noBlocker = true

export default ExampleFigureComponent