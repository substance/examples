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
    var doc = node.getDocument();
    var expressionNode = doc.get(node.expressionId);
    return $$('span').append(expressionNode.getDisplayValue());
  };

};

InlineNodeComponent.extend(ExpressionReferenceComponent);

module.exports = ExpressionReferenceComponent;
