'use strict';

var InlineNode = require('substance/model/InlineNode');

function InlineEntityNode() {
  InlineEntityNode.super.apply(this, arguments);
}

InlineNode.extend(InlineEntityNode);

InlineEntityNode.static.name = 'inline-entity';

InlineEntityNode.static.defineSchema({
  name: 'text',
  description: 'text'
});

module.exports = InlineEntityNode;
