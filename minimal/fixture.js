/*
  Example document
*/
export default function(tx) {
  let body = tx.get('body')
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum orci sed interdum porta. Duis nulla tortor, luctus eu enim at, rhoncus rhoncus enim. Donec diam arcu, dapibus id mattis pellentesque, elementum accumsan nisi. In hendrerit, lacus ut sollicitudin placerat, arcu quam sollicitudin tellus, at sodales risus est vel risus. Pellentesque cursus semper ex, eget finibus tellus lacinia at. Phasellus ut metus venenatis, euismod nulla quis, luctus dolor. Integer ornare, lacus ut dignissim laoreet, enim ipsum lobortis arcu, pellentesque vestibulum mi erat quis justo. Aliquam ac nibh sed turpis bibendum semper. Duis dui velit, mattis in ligula non, volutpat porta nulla. Integer non posuere eros, a tincidunt neque. Donec fermentum, est vitae maximus venenatis, tellus magna venenatis nisi, ac scelerisque augue tortor vehicula lacus. Nullam fringilla dictum augue a ullamcorper."
  })
  body.show('p1')
  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum orci sed interdum porta. Duis nulla tortor, luctus eu enim at, rhoncus rhoncus enim. Donec diam arcu, dapibus id mattis pellentesque, elementum accumsan nisi. In hendrerit, lacus ut sollicitudin placerat, arcu quam sollicitudin tellus, at sodales risus est vel risus. Pellentesque cursus semper ex, eget finibus tellus lacinia at. Phasellus ut metus venenatis, euismod nulla quis, luctus dolor. Integer ornare, lacus ut dignissim laoreet, enim ipsum lobortis arcu, pellentesque vestibulum mi erat quis justo. Aliquam ac nibh sed turpis bibendum semper. Duis dui velit, mattis in ligula non, volutpat porta nulla. Integer non posuere eros, a tincidunt neque. Donec fermentum, est vitae maximus venenatis, tellus magna venenatis nisi, ac scelerisque augue tortor vehicula lacus. Nullam fringilla dictum augue a ullamcorper."
  })
  body.show('p2')
}