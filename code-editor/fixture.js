'use strict';

module.exports = function(tx) {
  var body = tx.get('body');
  tx.create({
    id: 'h1',
    type: 'heading',
    level: 1,
    content: 'Embedding a 3rdParty CodeEditor'
  });
  body.show('h1');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      'It is possible to use 3rd party components, a code editor for instance, such as ACE.',
      'The editor us wrapped into an IsolatedNode which makes it independent from the main word-processor interface.',
    ].join(" ")
  });
  body.show('intro');

  tx.create({
    id: 's1',
    type: 'script',
    language: 'javascript',
    source: [
      "function hello_world() {",
      "  alert('Hello World!');",
      "}"
    ].join("\n")
  });
  body.show('s1');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
      "That's it."
    ].join(" ")
  });
  body.show('the-end');
};
