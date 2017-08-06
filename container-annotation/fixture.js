export default function(tx) {
  let body = tx.get('body')

  tx.create({
    id: 'title',
    type: 'heading',
    level: 1,
    content: 'Container Annotation'
  })
  body.show('title')
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: [
      "Pope Clement, by this, had sent to demand assistance from the Duke of Urbino, who was with the troops of Venice; he commissioned the envoy to tell his Excellency that the Castle of S. Angelo would send up every evening three beacons from its summit accompanied by three discharges of the cannon thrice repeated, and that so long as this signal was continued, he might take for granted that the castle had not yielded. "
    ].join(' ')
  })
  body.show('p1')

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: [
      "I was charged with lighting the beacons and firing the guns for this purpose; and all this while I pointed my artillery by day upon the places where mischief could be done."
    ].join(' ')
  })
  body.show('p2')

  tx.create({
    id: 'p3',
    type: 'paragraph',
    content: [
      "The Pope, in consequence, began to regard me with still greater favour, because he saw that I discharged my functions as intelligently as the task demanded."
    ].join(' ')
  })
  body.show('p3')

  tx.create({
    id: 'p4',
    type: 'paragraph',
    content: [
      "Aid from the Duke of Urbino never came; on which, as it is not my business, I will make no further comment."
    ].join(' ')
  })
  body.show('p4')

  tx.create({
    id: 'h1',
    type: 'highlight',
    containerId: 'body',
    startPath: ['p2', 'content'],
    startOffset: 14,
    endPath: ['p3', 'content'],
    endOffset: 10
  })
}