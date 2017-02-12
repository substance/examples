import { InlineNode } from 'substance'

class ExpressionReference extends InlineNode {

  getEvaluatedValue() {
    let expressionNode = this.getExpressionNode();
    if (expressionNode) {
      return expressionNode.getEvaluatedValue();
    }
  }

  getExpressionNode() {
    return this.getDocument().get(this.expressionId);
  }

}

ExpressionReference.type = 'expression-reference';

ExpressionReference.schema = {
  expressionId: 'id'
}

export default ExpressionReference
