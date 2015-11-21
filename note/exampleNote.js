var Note = require('./Note');
var doc = new Note();
var body = doc.get('body');

doc.create({
  id: 'p1',
  type: 'paragraph',
  content: 'Substance is a JavaScript library for web-based content editing. Build simple text editors or full-featured publishing systems. Substance provides you building blocks for your very custom editor.'
});
body.show('p1');

doc.create({
  id: 'm1',
  type: 'mark',
  path: ['p1', 'content'],
  startOffset: 0,
  endOffset: 9
});

doc.create({
  id: 't1',
  type: 'todo',
  done: false,
  content: 'Water the plants'
});
body.show('t1');

doc.create({
  id: 't2',
  type: 'todo',
  done: true,
  content: 'Fix bug'
});
body.show('t2');

doc.create({
  id: 't3',
  type: 'todo',
  done: true,
  content: 'Do taxes'
});
body.show('t3');

module.exports = doc;