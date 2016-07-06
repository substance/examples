'use strict';

var InlineNode = require('substance/model/InlineNode');
var Fragmenter = require('substance/model/Fragmenter');

function Expression() {
  Expression.super.apply(this, arguments);
}

Expression.Prototype = function() {

  this.getDisplayValue = function() {
    var value = this.getEvaluatedValue();
    if (this.units) {
      var factor = Expression.UNITS[this.units];
      value /= factor;
      value = [value, this.units].join(' ');
    }
    return String(value);
  };

  this.getEvaluatedValue = function() {
    var annotations = this.getAnnotations();
    var unfoldedExpression;
    if (annotations && annotations.length > 0) {
      var parts = [];
      var fragmenter = new Fragmenter({
        onText: function(context, text, entry) {
          if (text !== '$') {
            parts.push(text);
          }
        },
        onEnter: function(fragment) {
          var node = fragment.node;
          if (node.type === 'expression-reference') {
            parts.push(node.getEvaluatedValue());
          }
        }
      });
      fragmenter.start(null, this.value, annotations);
      unfoldedExpression = parts.join('');
    } else {
      unfoldedExpression = String(this.value);
    }

    var result;
    try {
      result = window.eval(unfoldedExpression); // eslint-disable-line no-eval
    } catch (err) {
      console.error(err);
      result = "ERROR";
    }
    return result;
  };

  this.getAnnotations = function() {
    return this.getDocument().getIndex('annotations').get([this.id, 'value']);
  };

};

InlineNode.extend(Expression);

Expression.static.name = 'expression';

Expression.static.defineSchema({
  value: { type: 'string', default: ' ' },
  showSource: { type: 'boolean', default: true },
  units: { type: 'string', optional: true },
  constant: { type: 'boolean', optional: true }
});

Expression.UNITS = {
  'GW': 1000000000,
  'TW': 1000000000000,
  '%': 1/100,
};

module.exports = Expression;
