export default function(tx) {
  let body = tx.get('body')
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Below you find all variants of IsolatedNodes."
  })
  body.show('p1')

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: "A regular IsolatedNode keeps the content blocked unless the user activates it with a double-click. The most prominent example is a Table."
  })
  body.show('p2')

  // row-1
  tx.create({ id: 'tc1', type: 'table-cell', content: "A1:A2", rowspan: 2 })
  tx.create({ id: 'tc2', type: 'table-cell', content: "B1", colspan: 2 })
  // row-2
  tx.create({ id: 'tc3', type: 'table-cell', content: "B2"})
  tx.create({ id: 'tc4', type: 'table-cell', content: "C2"})
  // row-3
  tx.create({ id: 'tc5', type: 'table-cell', content: "A3"})
  tx.create({ id: 'tc6', type: 'table-cell', content: "B3"})
  tx.create({ id: 'tc7', type: 'table-cell', content: "C3"})

  tx.create({
    id: 't1',
    type: 'table',
    // null values mark merged cells
    cells: [
      ['tc1', 'tc2', null ],
      [null, 'tc3', 'tc4'],
      ['tc5', 'tc6', 'tc7']
    ]
  })
  body.show('t1')

  tx.create({
    id: 'p3',
    type: 'paragraph',
    content: "An open IsolatedNode does not shield the content with a blocker. It is more accessible, but a little trickier to implement correctly."
  })
  body.show('p3')

  tx.create({
    id: 'fig1',
    type: 'figure',
    url: 'https://pbs.twimg.com/profile_images/706616363599532032/b5z-Hw5g.jpg',
    caption: 'This is the figure caption'
  })
  body.show('fig1')

  tx.create({
    id: 'p4',
    type: 'paragraph',
    content: "An InlineNode is the last variant. The most prominent example is an InlineImage $."
  })
  body.show('p4')
  tx.create({
    type: 'inline-image',
    id: 'im1',
    src: './assets/smile.png',
    path: ['p4', 'content'],
    startOffset: 80,
    endOffset: 81
  })

}