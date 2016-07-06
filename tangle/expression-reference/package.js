'use strict';

var ExpressionReference = require('./ExpressionReference');
var ExpressionReferenceComponent = require('./ExpressionReferenceComponent');

module.exports = {
  name: 'expression-reference',
  configure: function(config) {
    config.addNode(ExpressionReference);
    config.addComponent(ExpressionReference.static.name, ExpressionReferenceComponent);
    config.addStyle(__dirname, '_expression-reference.scss');
  }
};
