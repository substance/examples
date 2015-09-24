var Citation = require('./citation');

var TopicCitation = Citation.extend({
  name: "topic_citation",
  getItemType: function() {
    return "topic";
  },
});

TopicCitation.static.matchElement = function($el) {
  return $el.is(TopicCitation.static.tagName) && $el.attr('data-rtype') === 'topic';
};

TopicCitation.static.fromHtml = function($el, converter) {
  return Citation.static.fromHtml($el, converter);
};

TopicCitation.static.toHtml = function(citation, converter) {
  var $el = Citation.static.toHtml(citation, converter);
  // Add specific type
  $el.attr("data-rtype", "topic");
  return $el;
};

module.exports = TopicCitation;

