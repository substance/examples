import { InsertInlineNodeCommand } from 'substance'

class ExpressionCommand extends InsertInlineNodeCommand {

  createNodeData() {
    return {
      type: 'expression'
    }
  }
}

export default ExpressionCommand