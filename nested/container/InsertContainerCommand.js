'use strict';

var InsertNodeCommand = require('substance/ui/InsertNodeCommand');
var insertNode = require('substance/model/transform/insertNode');

function InsertContainerCommand() {
  InsertContainerCommand.super.apply(this, arguments);
}

InsertContainerCommand.Prototype = function() {

  this.insertNode = function(tx, args) {
    var textType = tx.getSchema().getDefaultTextType();
    var p = tx.create({
      type: textType,
      content: 'Lorem ipsum'
    });
    args.node = {
      type: 'container',
      nodes: [p.id]
    };
    return insertNode(tx, args);
  };

};

InsertNodeCommand.extend(InsertContainerCommand);

InsertContainerCommand.static.name = 'insert-container';

module.exports = InsertContainerCommand;
