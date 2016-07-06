'use strict';

var InlineNodeCommand = require('substance/ui/InlineNodeCommand');

function ExpressionCommand() {
  ExpressionCommand.super.apply(this, arguments);
}

ExpressionCommand.Prototype = function() {

  this.createNodeData = function() {
    return {
      type: 'expression'
    };
  };
};

InlineNodeCommand.extend(ExpressionCommand);

ExpressionCommand.static.name = 'expression';

module.exports = ExpressionCommand;