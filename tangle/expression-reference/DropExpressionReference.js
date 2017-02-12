
// TODO: we need a way to hook into the dropping of
// inline nodes
class DropExpressionReference {

  // This was the original implementation
  // which is not working anymore
  drop(params, context) { // eslint-disable-line no-unused-vars
    // var source = params.source;
    // var target = params.target;
    // var surface = target.surface;
    // var selection = target.selection;
    // var path = target.path;
    // if (!source || !source.component.is('.sc-expression')) return;
    // if (!surface || !selection || !path) return;
    // var sourceExpr = source.component.props.node;
    // var targetExpr = surface.getDocument().get(path[0]);
    // if (targetExpr.type !== 'expression') return;

    // console.log('Inserting reference for %s into exression %s', sourceExpr.id, targetExpr.id);

    // surface.transaction(function(tx) {
    //   tx.before.selection = selection;
    //   return insertInlineNode(tx, {
    //     selection: selection,
    //     node: {
    //       type: 'expression-reference',
    //       expressionId: sourceExpr.id
    //     }
    //   });
    // });
  }

}

export default DropExpressionReference
