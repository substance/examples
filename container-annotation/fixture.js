'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Container Annotations'
  });
  body.show('title');

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: [
      "Container Annotations are special in that they"
    ].join(' ')
  });
  body.show('p1');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: [
      "can span over multiple paragraphs."
    ].join(' ')
  });
  body.show('p2');

  tx.create({
    "id": "h1",
    "type": "highlight",
    "containerId": "body",
    "startPath": ["p1", "content"],
    "startOffset": 10,
    "endPath": ["p2", "content"],
    "endOffset": 20
  });


};
