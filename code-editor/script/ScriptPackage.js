'use strict';

var ScriptNode = require('./ScriptNode');
var ScriptEditor = require('./ScriptEditor');
var InsertScriptCommand = require('./InsertScriptCommand');
var InsertScriptTool = require('./InsertScriptTool');

module.exports = {
  name: 'script',
  configure: function(config) {
    config.addNode(ScriptNode);
    config.addComponent(ScriptNode.static.name, ScriptEditor);
    config.addCommand(InsertScriptCommand);
    config.addTool(InsertScriptTool);
    config.addIcon(InsertScriptCommand.static.name, { 'fontawesome': 'fa-code' });
    code.addLabel('script', 'Source Code');
  }
};
