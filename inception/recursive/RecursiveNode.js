'use strict';

var DocumentNode = require('substance/model/DocumentNode');

function RecursiveNode() {
  RecursiveNode.super.apply(this, arguments);
}

DocumentNode.extend(RecursiveNode);

RecursiveNode.static.name = 'recursive';
RecursiveNode.static.defineSchema({
  nodeId: 'id'
});

module.exports = RecursiveNode;