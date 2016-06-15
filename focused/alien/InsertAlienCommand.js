'use strict';

var InsertNodeCommand = require('substance/ui/InsertNodeCommand');

function InsertAlienCommand() {
  InsertAlienCommand.super.apply(this, arguments);
}

InsertAlienCommand.Prototype = function() {

  this.createNodeData = function() {
    return {
      type: 'alien',
      mood: 'normal'
    };
  };

};

InsertNodeCommand.extend(InsertAlienCommand);

InsertAlienCommand.static.name = 'insert-alien';

module.exports = InsertAlienCommand;
