'use strict';

var InlineProperty = require('./InlineProperty');
var InlinePropertyComponent = require('./InlinePropertyComponent');
var InlinePropertyCommand = require('./InlinePropertyCommand');
var InlinePropertyTool = require('./InlinePropertyTool');

module.exports = {
  name: 'hybrid-inline',
  configure: function(config) {
    config.addNode(InlineProperty);
    config.addComponent(InlineProperty.static.name, InlinePropertyComponent);
    config.addCommand(InlinePropertyCommand);
    config.addTool(InlinePropertyTool);
    config.addIcon(InlinePropertyCommand.static.name, { 'fontawesome': 'fa-cube' });
    config.addStyle(__dirname+'/_inline-property.scss');
  }
};
