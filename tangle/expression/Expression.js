import { InlineNode } from 'substance'
import Fragmenter from 'substance/model/Fragmenter'

class Expression extends InlineNode {

  getValue() {
    if (this.hasOwnProperty('_preliminaryValue')) {
      return this._preliminaryValue;
    } else {
      return this.value;
    }
  }

  getDisplayValue() {
    var value = this.getEvaluatedValue();
    if (this.units) {
      var factor = Expression.UNITS[this.units];
      value /= factor;
      // round to 2-digits
      value = Math.round(value*100)/100;
      value = [value, this.units].join(' ');
    }
    return String(value);
  }

  getEvaluatedValue() {
    var annotations = this.getAnnotations();
    var unfoldedExpression;
    if (annotations && annotations.length > 0) {
      var parts = [];
      var fragmenter = new Fragmenter({
        onText: function(context, text) {
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
      fragmenter.start(null, this.getValue(), annotations);
      unfoldedExpression = parts.join('');
    } else {
      unfoldedExpression = String(this.getValue());
    }

    var result;
    try {
      result = window.eval(unfoldedExpression); // eslint-disable-line no-eval
    } catch (err) {
      console.error(err);
      result = "ERROR";
    }
    return result;
  }

  getAnnotations() {
    return this.getDocument().getIndex('annotations').get([this.id, 'value']);
  }

}

Expression.type = 'expression'

Expression.schema = {
  value: { type: 'string', default: ' ' },
  units: { type: 'string', optional: true },
  variable: { type: 'boolean', optional: true }
}

Expression.UNITS = {
  'GW': 1000000000,
  'TW': 1000000000000,
  '%': 1/100,
}

export default Expression
