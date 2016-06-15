'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Focused Element'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "This shows a custom node which exposes a UI only when focused."
    ].join(' ')
  });
  body.show('intro');

  tx.create({
    type: 'alien',
    id: 'alien'
  });
  body.show('alien');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "That's it."
    ].join('')
  });
  body.show('the-end');
};
