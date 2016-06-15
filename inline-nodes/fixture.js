'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Inline Nodes'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "This shows an inline image $, which behaves like a character in the text."
    ].join(' ')
  });
  body.show('intro');

  tx.create({
    type: 'inline-image',
    id: 'i1',
    path: ['intro', 'content'],
    startOffset: 27,
    endOffset: 28
  });

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "Yours, Michael $, Oliver $, Daniel $."
    ].join('')
  });

  tx.create({
    type: 'inline-image',
    id: 'i2',
    src: './inline-image/michael.jpg',
    path: ['the-end', 'content'],
    startOffset: 15,
    endOffset: 16
  });

  tx.create({
    type: 'inline-image',
    id: 'i3',
    src: './inline-image/oliver.jpg',
    path: ['the-end', 'content'],
    startOffset: 25,
    endOffset: 26
  });

  tx.create({
    type: 'inline-image',
    id: 'i4',
    src: './inline-image/daniel.jpg',
    path: ['the-end', 'content'],
    startOffset: 35,
    endOffset: 36
  });


  body.show('the-end');
};
