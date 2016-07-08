'use strict';

var ExpressionReference = require('./ExpressionReference');
var ExpressionReferenceComponent = require('./ExpressionReferenceComponent');
var DropExpressionReference = require('./DropExpressionReference');

module.exports = {
  name: 'expression-reference',
  configure: function(config) {
    config.addNode(ExpressionReference);
    config.addComponent(ExpressionReference.static.name, ExpressionReferenceComponent);
    config.addStyle(__dirname, '_expression-reference.scss');
    config.addDragAndDrop(DropExpressionReference);
  }
};
