'use strict';
/* eslint-disable indent */

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Growth of solar power'
  });
  body.show('title');

  tx.create({
    id: 'intro',
    type: 'paragraph',
    content: [
      "This shows an example inspired by Tangle which is described in the article What can Technologist do about Climate Change by Bret Victor."
    ].join(' ')
  });
  tx.create({
    id: 'link-tangle',
    type: 'link',
    title: 'Tangle',
    url: 'http://worrydream.com/Tangle',
    path: ['intro', 'content'],
    startOffset: 34,
    endOffset: 40
  });
  tx.create({
    id: 'link-climate-change',
    type: 'link',
    title: 'What can Technologist do about Climate Change',
    url: 'http://worrydream.com/ClimateChange/#tools',
    path: ['intro', 'content'],
    startOffset: 75,
    endOffset: 120
  });
  body.show('intro');

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: [
      "The world consumes $. Solar accounts for $, or $."
    ].join(' ')
  });
  tx.create({
    type: 'expression',
    id: 'total-consumption',
    path: ['p1', 'content'],
    startOffset: 19,
    endOffset: 20,
    value: '17000000000000',
    units: 'TW',
    constant: true,
    showSource: false
  });

  tx.create({
    type: 'expression',
    id: 'total-solar',
    path: ['p1', 'content'],
    startOffset: 41,
    endOffset: 42,
    value: '178000000000',
    units: 'GW',
    constant: true,
    showSource: false
  });

  tx.create({
    type: 'expression',
    id: 'solar-ratio',
    path: ['p1', 'content'],
    startOffset: 47,
    endOffset: 48,
    value: '$ / $',
    units: '%',
    constant: true,
    showSource: false
  });
  tx.create({
    type: 'expression-reference',
    id: 'er1',
    path: ['solar-ratio', 'value'],
    startOffset: 0,
    endOffset: 1,
    expressionId: 'total-solar'
  });
  tx.create({
    type: 'expression-reference',
    id: 'er2',
    path: ['solar-ratio', 'value'],
    startOffset: 4,
    endOffset: 5,
    expressionId: 'total-consumption'
  });
  body.show('p1');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: [
      "To reach $ solar energy by $, it would have to grow $ per year."
    ].join(' ')
  });
  tx.create({
    type: 'expression',
    id: 'target-solar-ratio',
    path: ['p2', 'content'],
    startOffset: 9,
    endOffset: 10,
    value: '1.0',
    units: '%',
    showSource: false
  });
  tx.create({
    type: 'expression',
    id: 'target-year',
    path: ['p2', 'content'],
    startOffset: 27,
    endOffset: 28,
    value: '2050',
    showSource: false
  });
  tx.create({
    type: 'expression',
    id: 'growth',
    path: ['p2', 'content'],
    startOffset: 52,
    endOffset: 53,
    value: 'Math.pow(10, Math.log10($/$)/($-2016))-1.0',
    showSource: false
  });
  tx.create({
    type: 'expression-reference',
    id: 'er3',
    path: ['growth', 'value'],
    startOffset: 24,
    endOffset: 25,
    expressionId: 'target-solar-ratio'
  });
  tx.create({
    type: 'expression-reference',
    id: 'er4',
    path: ['growth', 'value'],
    startOffset: 26,
    endOffset: 27,
    expressionId: 'solar-ratio'
  });
  tx.create({
    type: 'expression-reference',
    id: 'er5',
    path: ['growth', 'value'],
    startOffset: 30,
    endOffset: 31,
    expressionId: 'target-year'
  });
  body.show('p2');
};
