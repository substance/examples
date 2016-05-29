'use strict';

var insertInlineNode = require('substance/model/transform/insertInlineNode');

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Tables'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
     "In this example we show how to use the TablePackage."
    ].join('')
  });
  body.show('intro');

  tx.create({id: 't1_1_1',type: 'paragraph', content: 'Lorem'});
  tx.create({id: 't1_1_2',type: 'paragraph', content: 'ipsum'});
  tx.create({id: 't1_1_3',type: 'paragraph', content: 'dolor'});
  tx.create({id: 't1_1_4',type: 'paragraph', content: 'sit'});
  tx.create({id: 't1_1_5',type: 'paragraph', content: 'amet'});
  tx.create({id: 't1_2_1',type: 'paragraph', content: 'Foo'});
  tx.create({id: 't1_3_1',type: 'paragraph', content: 'Bar'});
  tx.create({id: 't1_3_2',type: 'paragraph', content: 'Bla'});
  tx.create({id: 't1_4_2',type: 'paragraph', content: 'Blupp'});
  tx.create({
    id: 't1',
    type: 'table',
    cells: [
      [{content:'t1_1_1'}, {content:'t1_1_2'}, {content:'t1_1_3'}, {content:'t1_1_4'}, {content:'t1_1_5'}],
      [{content:'t1_2_1'}, 0, 0, 0, 0 ],
      [{content:'t1_3_1'}, {content:'t1_3_2'}, 0, 0, 0 ],
      [0, {content:'t1_4_2'}, 0, 0, 0 ],
    ]
  });
  body.show('t1');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "That's it."
    ].join('')
  });
  body.show('the-end');

};
