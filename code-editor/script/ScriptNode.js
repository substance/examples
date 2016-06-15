'use strict';

var BlockNode = require('substance/model/BlockNode');

function ScriptNode() {
  ScriptNode.super.apply(this, arguments);
}

BlockNode.extend(ScriptNode);

ScriptNode.static.name = 'script';

ScriptNode.static.defineSchema({
  'language': 'string',
  'source': 'text'
});

module.exports = ScriptNode;
