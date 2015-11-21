/*
  You can run this example in Node.js or in the browser
*/

var note = require('./exampleNote');

/**
  Inspect container
*/
var body = note.get('body');
console.log('body.nodes', body.nodes);

/**
  Inspect todo node
*/
var t2 = note.get('t2');
var t2Pos = body.getPosition(t2.id);
console.log('t2', t2.toJSON());
console.log('t2 position in body', t2Pos);

/**
  Address API - as used by ContainerEditor

  A node can have one or more text properties. Such text
  properties are addressable in a container. Hierarcharchical
  structures are supported as well.
*/
var t2ContentAddress = body.getAddress([t2.id, 'content']);
var successorAddress = body.getNextAddress(t2ContentAddress);
var successorPath = body.getPath(successorAddress);
console.log('t2.content address', t2ContentAddress);
console.log('t2.content successor address', successorAddress);
console.log('t2.content successor path', successorPath);