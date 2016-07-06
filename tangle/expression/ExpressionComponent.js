'use strict';

var InlineNodeComponent = require('substance/ui/InlineNodeComponent');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');

function ExpressionComponent() {
  ExpressionComponent.super.apply(this, arguments);
}

ExpressionComponent.Prototype = function() {

  var _super = ExpressionComponent.super.prototype;

  this.didMount = function() {
    _super.didMount.call(this);
    this.props.node.on('value:changed', this.rerender, this);
    this.props.node.on('inplace:changed', this.rerender, this);
  };

  this.dispose = function() {
    _super.dispose.call(this);
    this.props.node.off(this);
  };

  this.render = function($$) { // eslint-disable-line
    var node = this.props.node;
    var el = _super.render.apply(this, arguments);
    el.addClass('sc-expression');
    if (node.inplace) {
      el.addClass('sm-inplace');
    } else {
      el.addClass('sm-inline');
    }
    return el;
  };

  this.renderContent = function($$) {
    var el;
    var node = this.props.node;
    if (node.inplace) {
      el = $$(TextPropertyEditor, {
        disabled: this.props.disabled,
        tagName: 'span',
        path: [node.id, 'value'],
        withoutBreak: true
      });
    } else {
      el = $$('span').append(
        node.getDisplayValue()
      );
    }
    return el;
  };

};

InlineNodeComponent.extend(ExpressionComponent);

// don't apply the default strategy to render the node inside an InlineNodeComponent
ExpressionComponent.static.isCustom = true;

module.exports = ExpressionComponent;
