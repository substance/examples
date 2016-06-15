'use strict';

var InlineNodeCommand = require('substance/ui/InlineNodeCommand');

function InlineImageCommand() {
  InlineImageCommand.super.apply(this, arguments);
}

InlineImageCommand.Prototype = function() {
  this.createNodeData = function() {
    return {
      type: 'inline-image'
    };
  };
};

InlineNodeCommand.extend(InlineImageCommand);
InlineImageCommand.static.name = 'inline-image';

module.exports = InlineImageCommand;