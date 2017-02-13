import { Command } from 'substance'

class EditExpressionCommand extends Command {

  /**
    Get command state

    @return {Object} object with `disabled` and `node` properties
  */
  getCommandState(params) {
    // let sel = this._getSelection(params)
    let annos = this._getAnnotationsForSelection(params)
    let newState = {
      disabled: true,
    }
    if (annos.length === 1) {
      newState.disabled = false
      newState.node = annos[0]
    }
    return newState
  }

  execute(params) { } // eslint-disable-line

  _getAnnotationsForSelection(params) {
    return params.selectionState.getAnnotationsForType('expression')
  }
}

export default EditExpressionCommand
