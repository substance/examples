// Fake dictionary
const SUGGESTIONS = [
  'Bug',
  'Rabbit',
  'Horse',
  'Turtle',
  'Hummingbird'
]

export default function fixture(doc) {
  let body = doc.get('body')
  doc.create({
    id: 'p1',
    type: 'paragraph',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas nisi orci, a pulvinar nunc tristique eu. Aliquam pretium vulputate diam, in commodo risus placerat id. In luctus nibh at molestie pharetra. Phasellus commodo malesuada diam, vitae suscipit turpis luctus at. Integer porta eros sit amet dolor feugiat, nec porta nisi egestas. Suspendisse sed posuere odio, at tincidunt lacus. Etiam eget nibh mi. Curabitur eget ligula imperdiet, rutrum tortor molestie, egestas neque. Sed egestas lectus aliquam rutrum imperdiet."
  })
  body.show('p1')
  doc.create({
    id: 'p2',
    type: 'paragraph',
    content: "Vivamus nulla dui, dictum vitae purus eu, suscipit laoreet libero. In tincidunt suscipit neque. Fusce a consequat diam. Fusce felis enim, venenatis in dapibus non, lobortis facilisis dolor. Curabitur et nisl non elit scelerisque tristique. Quisque nisi nulla, placerat vitae sem eget, commodo porta nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum ipsum diam."
  })
  body.show('p2')
  doc.create({
    id: 'p3',
    type: 'paragraph',
    content: "In sagittis hendrerit lacus, id euismod dolor finibus non. Integer est tortor, tristique vitae scelerisque quis, facilisis in odio. Nulla fringilla sem eget odio blandit, nec mattis enim condimentum. Ut feugiat placerat ex, vel porttitor tellus bibendum eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis ante nec lorem tempus, at iaculis dolor ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur ut velit sit amet turpis rhoncus suscipit sit amet id nisi. Duis in suscipit felis, nec fringilla lacus. Nunc pulvinar quam eu lacus dictum, sed rhoncus orci posuere. Mauris at vehicula velit. Phasellus vulputate risus nec tincidunt ultrices. Integer sed aliquam ex. Mauris placerat risus quis mi laoreet mattis. Nam eget tempor ligula."
  })
  body.show('p3')
  doc.create({
    id: 'p4',
    type: 'paragraph',
    content: "Praesent vulputate aliquam massa et tristique. Praesent euismod interdum congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris laoreet euismod nibh, fermentum imperdiet neque dapibus in. Vestibulum et scelerisque erat. Pellentesque efficitur mauris eu sodales mollis. Ut sagittis mollis odio nec convallis. Phasellus vulputate lorem id rutrum venenatis. Etiam id ultrices nunc. Donec eget magna ante. Ut vitae dui tempus, vestibulum magna vitae, interdum dolor."
  })
  body.show('p4')

  // using data directly means that this happens outside of the session
  doc.data.create({
    type: 'spell-error',
    id: 'se1',
    path: ['p1', 'content'],
    startOffset: 240,
    endOffset: 244,
    suggestions: SUGGESTIONS
  })
  doc.data.create({
    type: 'spell-error',
    id: 'se2',
    path: ['p1', 'content'],
    startOffset: 279,
    endOffset: 286,
    suggestions: SUGGESTIONS
  })
}
