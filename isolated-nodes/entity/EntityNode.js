'use strict';

var DocumentNode = require('substance/model/DocumentNode');

function EntityNode() {
  EntityNode.super.apply(this, arguments);
}

DocumentNode.extend(EntityNode);

EntityNode.static.name = 'entity';

EntityNode.static.defineSchema({
  name: 'text',
  description: 'text'
});

module.exports = EntityNode;
