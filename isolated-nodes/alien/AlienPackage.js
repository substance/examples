'use strict';

var AlienNode = require('./AlienNode');
var AlienComponent = require('./AlienComponent');
var InsertAlienCommand = require('./InsertAlienCommand');
var InsertAlienTool = require('./InsertAlienTool');

module.exports = {
  name: 'alien',
  configure: function(config) {
    config.addNode(AlienNode);
    config.addComponent(AlienNode.static.name, AlienComponent);
    config.addCommand(InsertAlienCommand);
    config.addTool(InsertAlienTool);
  }
};
