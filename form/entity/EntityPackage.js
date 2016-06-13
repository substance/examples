'use strict';

var EntityNode = require('./EntityNode');
var EntityComponent = require('./EntityComponent');
var InsertEntityCommand = require('./InsertEntityCommand');
var InsertEntityTool = require('./InsertEntityTool');

module.exports = {
  name: 'entity',
  configure: function(config) {
    config.addNode(EntityNode);
    config.addComponent(EntityNode.static.name, EntityComponent);
    config.addCommand(InsertEntityCommand);
    config.addTool(InsertEntityTool);
    config.addIcon(InsertEntityCommand.static.name, { 'fontawesome': 'fa-space-shuttle' });
  }
};
