import ExpressionReference from './ExpressionReference'
import ExpressionReferenceComponent from './ExpressionReferenceComponent'
// import DropExpressionReference from './DropExpressionReference'

export default {
  name: 'expression-reference',
  configure: function(config) {
    config.addNode(ExpressionReference)
    config.addComponent(ExpressionReference.type, ExpressionReferenceComponent)
    // FIXME
    // config.addDragAndDrop(DropExpressionReference);
  }
}
