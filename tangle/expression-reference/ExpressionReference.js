'use strict';

var InlineNode = require('substance/model/InlineNode');

function ExpressionReference() {
  ExpressionReference.super.apply(this, arguments);
}

ExpressionReference.Prototype = function() {

  this.getEvaluatedValue = function() {
    var expressionNode = this.getExpressionNode();
    if (expressionNode) {
      return expressionNode.getEvaluatedValue();
    }
  };

  this.getExpressionNode = function() {
    return this.getDocument().get(this.expressionId);
  };

};

InlineNode.extend(ExpressionReference);

ExpressionReference.static.name = 'expression-reference';

ExpressionReference.static.defineSchema({
  expressionId: 'id'
});

module.exports = ExpressionReference;
