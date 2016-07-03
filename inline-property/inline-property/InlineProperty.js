'use strict';

var InlineNode = require('substance/model/InlineNode');

function InlineProperty() {
  InlineProperty.super.apply(this, arguments);
}

InlineProperty.Prototype = function() {

  this.getEvaluatedValue = function() {
    var result;
    try {
      result = window.eval(this.value); // eslint-disable-line no-eval
    } catch (err) {
      console.error(err);
      result = "ERROR";
    }
    return result;
  };

};

InlineNode.extend(InlineProperty);

InlineProperty.static.name = 'inline-property';

InlineProperty.static.defineSchema({
  content: { type: 'text', default: ' ' },
});

module.exports = InlineProperty;
