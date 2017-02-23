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
      "This shows a container annotation"
    ].join(' ')
  })
  body.show('p1')

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: [
      "that spans over two paragraphs"
    ].join(' ')
  })
  body.show('p2')

  tx.create({
    id: 'h1',
    type: 'highlight',
    containerId: 'body',
    startPath: ['p1', 'content'],
    startOffset: 13,
    endPath: ['p2', 'content'],
    endOffset: 10
  })
}
