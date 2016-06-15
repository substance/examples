'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Inception'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "In this document there is one node which is displaying the document's content itself again",
      "up to a certain level where it ends with -- The Terminator."
    ].join(' ')
  });
  body.show('intro');

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: [
      "This is way too crazy."
    ].join(' ')
  });

  tx.create({
    id: 'inception',
    type: 'recursive',
    nodeId: 'body'
  });
  body.show('inception');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "It really is."
    ].join('')
  });
  body.show('the-end');

};
