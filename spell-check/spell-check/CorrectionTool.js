import { Tool, insertText } from 'substance'

class CorrectionTool extends Tool {

  render($$) {
    let node = this.props.node
    let Button = this.getComponent('button')
    let el = $$('div').addClass('sc-correction-tool')

    if (node) {
      node.suggestions.forEach((s) => {
        el.append(
          $$(Button, {
            label: s,
            style: this.props.style
          }).attr('title', this.getLabel('open-link'))
            .attr('data-correction', s)
            .on('click', this._applyCorrection.bind(this, s))
        )
      })
    }
    return el
  }

  _applyCorrection(suggestion) {
    let surfaceManager = this.context.surfaceManager;
    let surface = surfaceManager.getFocusedSurface()
    surface.transaction(function(tx, args) {
      return insertText(tx, {
        selection: args.selection,
        text: suggestion
      })
    })

  }
}

export default CorrectionTool
