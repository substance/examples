'use strict';

var RecursiveNode = require('./RecursiveNode');
var RecursiveComponent = require('./RecursiveComponent');

module.exports = {
  name: 'inception',
  configure: function(config) {
    config.addNode(RecursiveNode);
    config.addComponent(RecursiveNode.static.name, RecursiveComponent);
    config.addStyle(__dirname+'/_recursive.scss');
  }
};
