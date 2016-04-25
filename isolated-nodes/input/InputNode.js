'use strict';

var DocumentNode = require('substance/model/DocumentNode');

function InputNode() {
  InputNode.super.apply(this, arguments);
}

DocumentNode.extend(InputNode);

InputNode.static.name = 'input';

InputNode.static.defineSchema({
  content: { type: 'string', default: '' }
});

module.exports = InputNode;
