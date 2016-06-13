'use strict';

var InsertNodeCommand = require('substance/ui/InsertNodeCommand');

function InsertEntityCommand() {
  InsertEntityCommand.super.apply(this, arguments);
}

InsertEntityCommand.Prototype = function() {

  this.createNodeData = function() {
    return {
      type: 'entity',
      name: 'Foo',
      description: 'Bar'
    };
  };

};

InsertNodeCommand.extend(InsertEntityCommand);

InsertEntityCommand.static.name = 'insert-entity';

module.exports = InsertEntityCommand;
