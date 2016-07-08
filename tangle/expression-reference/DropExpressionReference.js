'use strict';

var DragAndDropHandler = require('substance/ui/DragAndDropHandler');
var insertInlineNode = require('substance/model/transform/insertInlineNode');

function DropExpressionReference() {}

DropExpressionReference.Prototype = function() {

  this.drop = function(params, context) { // eslint-disable-line no-unused-vars
    var source = params.source;
    var target = params.target;
    var surface = target.surface;
    var selection = target.selection;
    var path = target.path;
    if (!source || !source.component.is('.sc-expression')) return;
    if (!surface || !selection || !path) return;
    var sourceExpr = source.component.props.node;
    var targetExpr = surface.getDocument().get(path[0]);
    if (targetExpr.type !== 'expression') return;

    console.log('Inserting reference for %s into exression %s', sourceExpr.id, targetExpr.id);

    surface.transaction(function(tx) {
      tx.before.selection = selection;
      return insertInlineNode(tx, {
        selection: selection,
        node: {
          type: 'expression-reference',
          expressionId: sourceExpr.id
        }
      });
    });
  };

};

DragAndDropHandler.extend(DropExpressionReference);

module.exports = DropExpressionReference;
