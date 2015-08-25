var Annotation = require('substance/document/annotation');

var Mark = Annotation.extend({
  name: "mark",
  splitContainerSelections: true
});

// HTML tag used to represent a mark annotation
Mark.static.tagName = "mark";

// Called during import from HTML. If matched `fromHtml` is called. 
// We don't need to implement it, since it's defined on the Annotation class.
Mark.static.matchElement = function($el) {
  return $el.is("mark");
};

module.exports = Mark;