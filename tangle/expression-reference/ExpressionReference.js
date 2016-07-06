'use strict';

var InlineNode = require('substance/model/InlineNode');

function ExpressionReference() {
  ExpressionReference.super.apply(this, arguments);
}

ExpressionReference.Prototype = function() {

  this.getEvaluatedValue = function() {
    var doc = this.getDocument();
    var expressionNode = doc.get(this.expressionId);
    return expressionNode.getEvaluatedValue();
  };

};

InlineNode.extend(ExpressionReference);

ExpressionReference.static.name = 'expression-reference';

ExpressionReference.static.defineSchema({
  expressionId: 'id'
});

module.exports = ExpressionReference;
