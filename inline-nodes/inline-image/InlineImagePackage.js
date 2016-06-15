'use strict';

var InlineImage = require('./InlineImage');
var InlineImageComponent = require('./InlineImageComponent');
var InlineImageCommand = require('./InlineImageCommand');
var InlineImageTool = require('./InlineImageTool');
var EditInlineImageTool = require('./EditInlineImageTool');

module.exports = {
  name: 'inline-image',
  configure: function(config) {
    config.addNode(InlineImage);
    config.addComponent(InlineImage.static.name, InlineImageComponent);
    config.addCommand(InlineImageCommand);
    config.addTool(InlineImageTool);
    config.addIcon(InlineImageCommand.static.name, { 'fontawesome': 'fa-image' });

    config.addTool(EditInlineImageTool, { overlay: true });
  }
};
