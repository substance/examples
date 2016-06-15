'use strict';

var ContainerComponent = require('./ContainerComponent');
var InsertContainerCommand = require('./InsertContainerCommand');
var InsertContainerTool = require('./InsertContainerTool');

module.exports = {
  name: 'container',
  configure: function(config) {
    config.addComponent('container', ContainerComponent);
    config.addCommand(InsertContainerCommand);
    config.addTool(InsertContainerTool);
    config.addIcon(InsertContainerTool.static.name, { 'fontawesome': 'fa-align-justify' });
  }
};
