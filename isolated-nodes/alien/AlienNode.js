'use strict';

var DocumentNode = require('substance/model/DocumentNode');

function AlienNode() {
  AlienNode.super.apply(this, arguments);
}

DocumentNode.extend(AlienNode);

AlienNode.static.name = 'alien';

AlienNode.static.defineSchema({
  mood: { type: 'string', default: 'normal' }
});

module.exports = AlienNode;
