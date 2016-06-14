'use strict';

var Highlight = require('./Highlight');
var HighlightCommand = require('./HighlightCommand');
var HighlightTool = require('./HighlightTool');

module.exports = {
  name: 'highlight',
  configure: function(config) {
    config.addNode(Highlight);
    config.addCommand(HighlightCommand);
    config.addTool(HighlightTool);
    config.addIcon(HighlightCommand.static.name, { 'fontawesome': 'fa-pencil' });
  }
};
