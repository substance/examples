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

  var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis et nisi consequat gravida. Vestibulum non lobortis dui. Proin eu orci justo. Maecenas in sapien blandit tortor congue tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus sed suscipit lorem, non ornare dui. Aenean ornare augue vel augue mattis tempor sed sed sem.".split(' ');

  var rows = 4;
  var cols = 5;
  var cells = [];
  var pos = 0;
  var tableId = 't1';
  for (var i=0; i<rows; i++) {
    var row = [];
    for (var j=0; j<cols; j++) {
      var cellId = [tableId, i, j].join('_');
      var cellContent = tx.create({
        id: cellId,
        type: 'paragraph',
        content: loremIpsum[pos++]
      });
      row.push(cellId);
    }
    cells.push(row);
  }

  tx.create({
    id: 't1',
    type: 'table',
    cells: cells
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
