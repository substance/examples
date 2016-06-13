'use strict';

var InputNode = require('./InputNode');
var InputComponent = require('./InputComponent');

module.exports = {
  name: 'input',
  configure: function(config) {
    config.addNode(InputNode);
    config.addComponent(InputNode.static.name, InputComponent);
  }
};
