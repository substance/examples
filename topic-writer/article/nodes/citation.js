var Substance = require('substance');
var _ = require('substance/helpers');

var Citation = Substance.Document.Annotation.extend({
  name: "citation",

  properties: {
    target: 'id',
  },

  getDefaultProperties: function() {
    return {target: null};
  }
});

Citation.static.tagName = 'cite';
// We need this when we want to auto-generate labels
// Citation.static.external = true;

Citation.static.matchElement = function($el) {
  return $el.is(Citation.static.tagName);
};

Citation.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'citation');
  var citation = {
    id: id,
    target: $el.attr('data-rid')
  };

  // consider content inside the element (content property of the wrapping paragraph)
  converter.annotatedText($el);
  return citation;
};

Citation.static.toHtml = function(citation, converter) {
  var id = citation.id;
  var targets = citation.target

  var $el = $('<cite>')
    .attr('id', id)
    .attr('data-rid', target);
  return $el;
};

module.exports = Citation;