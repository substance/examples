'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Nested Elements'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "The concept of Isolated Nodes allows to create nested content."
    ].join(' ')
  });
  body.show('intro');

  var c1 = tx.create({
    type: 'container',
    id: 'c1',
    nodes: []
  });
  body.show('c1');

  tx.create({
    type: 'paragraph',
    id: 'c1_p1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
    content: 'Nunc turpis erat, sodales id aliquet eget, rutrum vel libero.'
  });
  c2.show('c2_p1');

  tx.create({
    type: 'paragraph',
    id: 'c1_p2',
    content: 'Donec dapibus vel leo sit amet auctor. Curabitur at diam urna.'
  });
  c1.show('c1_p2');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "That's it."
    ].join('')
  });
  body.show('the-end');

};
