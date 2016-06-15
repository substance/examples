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
      "This is way too crazy."
    ].join(' ')
  });
  body.show('intro');

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
