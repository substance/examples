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
  tx.create({id: 't1_2_2',type: 'paragraph', content: ''});
  tx.create({id: 't1_2_3',type: 'paragraph', content: ''});
  tx.create({id: 't1_2_4',type: 'paragraph', content: ''});
  tx.create({id: 't1_2_5',type: 'paragraph', content: ''});

  tx.create({id: 't1_3_1',type: 'paragraph', content: 'Bar'});
  tx.create({id: 't1_3_2',type: 'paragraph', content: 'Bla'});
  tx.create({id: 't1_3_3',type: 'paragraph', content: ''});
  tx.create({id: 't1_3_4',type: 'paragraph', content: ''});
  tx.create({id: 't1_3_5',type: 'paragraph', content: ''});

  tx.create({id: 't1_4_1',type: 'paragraph', content: ''});
  tx.create({id: 't1_4_2',type: 'paragraph', content: 'Blupp'});
  tx.create({id: 't1_4_3',type: 'paragraph', content: ''});
  tx.create({id: 't1_4_4',type: 'paragraph', content: ''});
  tx.create({id: 't1_4_5',type: 'paragraph', content: ''});

  tx.create({
    id: 't1',
    type: 'table',
    cells: [
      [{content:'t1_1_1'}, {content:'t1_1_2'}, {content:'t1_1_3'}, {content:'t1_1_4'}, {content:'t1_1_5'}],
      [{content:'t1_2_1'}, {content:'t1_2_2'}, {content:'t1_2_3'}, {content:'t1_2_4'}, {content:'t1_2_5'}],
      [{content:'t1_3_1'}, {content:'t1_3_2'}, {content:'t1_3_3'}, {content:'t1_3_4'}, {content:'t1_3_5'} ],
      [{content:'t1_4_1'}, {content:'t1_4_2'}, {content:'t1_4_3'}, {content:'t1_4_4'}, {content:'t1_4_5'} ]
    ]
  });
  body.show('t1');

  tx.create({
    id: 'the-end',
    type: 'paragraph',
    content: [
     "Table support is currently limited. Beta 5 will include things like row/cell insertion etc."
    ].join('')
  });
  body.show('the-end');

};
