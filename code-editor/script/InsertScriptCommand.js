'use strict';

var InsertNodeCommand = require('substance/ui/InsertNodeCommand');

function InsertScriptCommand() {
  InsertScriptCommand.super.apply(this, arguments);
}

InsertScriptCommand.Prototype = function() {

  this.createNodeData = function() {
    return {
      type: 'script',
      language: 'javascript',
      content: ''
    };
  };

};

InsertNodeCommand.extend(InsertScriptCommand);

InsertScriptCommand.static.name = 'insert-script';

module.exports = InsertScriptCommand;
