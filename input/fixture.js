'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Input Element'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "You can use custom elements with an HTML input element"
    ].join('')
  });
  body.show('intro');

  tx.create({
    type: 'input',
    id: 'input',
    content: 'Lorem ipsum...'
  });
  body.show('input');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "That way you can implement editor functionality using class web development practices."
    ].join('')
  });
  body.show('the-end');

};
