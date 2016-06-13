'use strict';

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Type * followed by a space to create unordered list items!"
  });
  body.show('p1');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: ""
  });
  body.show('p2');
};
