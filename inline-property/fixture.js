'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Inline Property Editor'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "This shows an $, which renders a property editor",
      "in the flow of the text, creating an interface similar to a regular annotations.",
      "Still, in contrast to an annotation the content is owned by the inline node."
    ].join(' ')
  });
  tx.create({
    type: 'inline-property',
    id: 'i1',
    path: ['intro', 'content'],
    startOffset: 14,
    endOffset: 15,
    content: 'inline property',
  });
  body.show('intro');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "That's it."
    ].join('')
  });
  body.show('the-end');
};
