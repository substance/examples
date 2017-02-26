export default function(tx) {
  // row-1
  tx.create({ id: 'sc1', type: 'spreadsheet-cell', source: '=5+3', value: '8' })
  tx.create({ id: 'sc2', type: 'spreadsheet-cell', source: '=A1*2', value: '16' })
  tx.create({ id: 'sc3', type: 'spreadsheet-cell', source: '=A2+1', value: '17' })
  // row-2
  tx.create({ id: 'sc4', type: 'spreadsheet-cell', source: '' })
  tx.create({ id: 'sc5', type: 'spreadsheet-cell', source: '' })
  tx.create({ id: 'sc6', type: 'spreadsheet-cell', source: '' })
  // row-3
  tx.create({ id: 'sc7', type: 'spreadsheet-cell', source: '' })
  tx.create({ id: 'sc8', type: 'spreadsheet-cell', source: '' })
  tx.create({ id: 'sc9', type: 'spreadsheet-cell', source: '' })

  tx.create({
    id: 's1',
    type: 'spreadsheet',
    cells: [
      ['sc1', 'sc2', 'sc3' ],
      ['sc4', 'sc5', 'sc6'],
      ['sc7', 'sc8', 'sc9']
    ]
  })
}
