export default function(tx) {
  let body = tx.get('body')
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Below is an editable table."
  })
  body.show('p1')

  // row-1
  tx.create({ id: 'tc1', type: 'table-cell', content: "A1:A2", rowspan: 2 })
  tx.create({ id: 'tc2', type: 'table-cell', content: "B1",    colspan: 2 })
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
      [null,  'tc3', 'tc4'],
      ['tc5', 'tc6', 'tc7']
    ]
  })
  body.show('t1')
}