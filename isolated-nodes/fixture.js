'use strict';

var createDocumentFactory = require('substance/model/createDocumentFactory');
var ProseArticle = require('substance/packages/prose-editor/ProseArticle');
var ProseSchema = require('substance/packages/prose-editor/ProseSchema');
var insertInlineNode = require('substance/model/transform/insertInlineNode');

var AlienNode = require('./alien/AlienNode');
var EntityNode = require('./entity/EntityNode');
var InputNode = require('./input/InputNode');
var InlineEntityNode = require('./inline-entity/InlineEntityNode');

function CustomSchema() {
  CustomSchema.super.apply(this, arguments);

  this.addNode(AlienNode);
  this.addNode(EntityNode);
  this.addNode(InputNode);
  this.addNode(InlineEntityNode);
}
ProseSchema.extend(CustomSchema);

CustomSchema.static.name = 'isolated-nodes';
CustomSchema.static.version = '1.0.0';

function CustomArticle() {
  CustomArticle.super.apply(this, arguments);
}
ProseArticle.extend(CustomArticle);

CustomArticle.static.Schema = CustomSchema;

module.exports = createDocumentFactory(CustomArticle, function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Isolated Nodes'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
     "Isolated Nodes provide a means to have complex content, wrapped into a node, ",
     "which on the parent level acts like a single-character block-level element.",
     "This means when navigating into the node with keyboard or when clicking the whole node is selected at first. ",
     "It can then be deleted or cut easily.",
     "To edit its content, the node needs to be focused (using ENTER). Then the content gets unblocked and its UI exposed."
    ].join('')
  });
  body.show('intro');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: [
     "The Entity example shows a form editor, where the entity has two fields, name and description."
    ].join('')
  });
  body.show('p2');

  tx.create({
    type: 'entity',
    id: 'entity',
    name: 'Foo',
    description: 'Bar'
  });
  body.show('entity');

  tx.create({
    id: 'p3',
    type: 'paragraph',
    content: [
     "The Alien example shows a custom node with mouse driven UI which is exposed on hover, when the node has been focused."
    ].join('')
  });
  body.show('p3');

  tx.create({
    type: 'alien',
    id: 'alien'
  });
  body.show('alien');

  tx.create({
    id: 'p4',
    type: 'paragraph',
    content: [
     "The Input example shows a node which contains a native input element (as opposed to a TextPropertyEditor)."
    ].join('')
  });
  body.show('p4');

  tx.create({
    type: 'input',
    id: 'input',
    content: 'Lorem ipsum...'
  });
  body.show('input');

  tx.create({
    id: 'p5',
    type: 'paragraph',
    content: [
     "The NestedContainer example shows a node which contains another nested ContainerEditor."
    ].join('')
  });
  body.show('p5');

  var c1 = tx.create({
    type: 'container',
    id: 'c1',
    nodes: []
  });
  body.show('c1');

  tx.create({
    type: 'paragraph',
    id: 'c1_p1',
    content: 'ABCDEFGH'
  });
  c1.show('c1_p1');

  var c2 = tx.create({
    type: 'container',
    id: 'c2',
    nodes: []
  });
  c1.show('c2');

  tx.create({
    type: 'paragraph',
    id: 'c2_p1',
    content: 'Lorem Ipsum...'
  });
  c2.show('c2_p1');

  tx.create({
    type: 'paragraph',
    id: 'c1_p2',
    content: 'IJKLMNOP'
  });
  c1.show('c1_p2');

  tx.create({
    id: 'p6',
    type: 'paragraph',
    content: [
     "Inline Nodes are isolated as well."
    ].join('')
  });
  body.show('p6');

  insertInlineNode(tx, {
    selection: tx.createSelection(['p6', 'content'], 33),
    node: {
      type: 'inline-entity',
      id : 'inline-entity',
      name: 'Bla',
      description: 'Blupp'
    }
  });

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "That's it."
    ].join('')
  });
  body.show('the-end');

});
