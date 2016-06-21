'use strict';

var InlineNodeComponent = require('substance/ui/InlineNodeComponent');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');

function ExpressionReferenceComponent() {
  ExpressionReferenceComponent.super.apply(this, arguments);
}

ExpressionReferenceComponent.Prototype = function() {

  var _super = ExpressionReferenceComponent.super.prototype;

  this.render = function($$) { // eslint-disable-line
    var el = _super.render.apply(this, arguments);
    el.addClass('sc-expression-reference');
    return el;
  };

  this.renderContent = function($$) {
    var node = this.props.node;
    var expressionNode = node.getExpressionNode();
    return $$('span').append(expressionNode.getDisplayValue());
  };

  this.setState = function(newState) {
    _super.setState.apply(this, arguments);
    var expressionNode = this.props.node.getExpressionNode();
    if (newState.mode === 'selected') {
      expressionNode.highlighted = true;
      expressionNode.emit('highlighted:changed');
    } else if (expressionNode.highlighted) {
      expressionNode.highlighted = false;
      expressionNode.emit('highlighted:changed');
    }
  };

};

InlineNodeComponent.extend(ExpressionReferenceComponent);

module.exports = ExpressionReferenceComponent;
