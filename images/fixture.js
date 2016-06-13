'use strict';

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Insert new image using the image tool"
  });
  body.show('p1');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: "Please note that images are not actually uploaded in this example. You would need to provide a custom file client that talks to an image store. See FileClientStub which reveals the API you have to implement."
  });
  body.show('p2');
};
