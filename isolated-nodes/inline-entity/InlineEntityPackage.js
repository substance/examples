'use strict';

var InlineEntityNode = require('./InlineEntityNode');
var InlineEntityComponent = require('./InlineEntityComponent');

module.exports = {
  name: 'inline-entity',
  configure: function(config) {
    config.addNode(InlineEntityNode);
    config.addComponent(InlineEntityNode.static.name, InlineEntityComponent);
  }
};
