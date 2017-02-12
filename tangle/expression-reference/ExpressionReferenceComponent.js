import { InlineNodeComponent } from 'substance'

class ExpressionReferenceComponent extends InlineNodeComponent {

  render($$) { // eslint-disable-line
    let el = super.render($$)
    el.addClass('sc-expression-reference');
    return el
  }

  renderContent($$) {
    let node = this.props.node;
    let expressionNode = node.getExpressionNode();
    return $$('span').append(expressionNode.getDisplayValue());
  }

  setState(newState) {
    super.setState(newState)
    let expressionNode = this.props.node.getExpressionNode();
    if (newState.mode === 'selected') {
      expressionNode.highlighted = true;
      expressionNode.emit('highlighted:changed');
    } else if (expressionNode.highlighted) {
      expressionNode.highlighted = false;
      expressionNode.emit('highlighted:changed');
    }
  }

}

export default ExpressionReferenceComponent
