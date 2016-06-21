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
    var node = this.props.node;
    node.on('value:changed', this.rerender, this);
    node.on('showSource:changed', this.rerender, this);
    node.getDocument().on('expression:update', this.rerender, this);
  };

  this.dispose = function() {
    _super.dispose.call(this);
    var node = this.props.node;
    node.off(this);
    node.getDocument().off(this);
  };

  this.render = function($$) { // eslint-disable-line
    var node = this.props.node;
    var el = _super.render.apply(this, arguments);
    el.addClass('sc-expression');
    if (node.showSource) {
      el.addClass('sm-show-source');
      el.append(
        $$('button')
          .addClass('se-confirm-value')
          .attr('contenteditable', false)
          .append(this.context.iconProvider.renderIcon($$, 'confirm-value'))
          .on('mousedown', this.confirmValue)
      );
    } else {
      el.addClass('sm-inline');
      if (node.variable) {
        el.addClass('sm-variable');
      }
    }
    return el;
  };

  this.renderContent = function($$) {
    var el;
    var node = this.props.node;
    if (node.showSource) {
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

  this.confirmValue = function() {
    var node = this.props.node;
    this.context.documentSession.transaction(function(tx) {
      tx.set([node.id, 'showSource'], false);
      return {
        // TODO: why is this still selecting the whole node?
        selection: node.getSelection().collapse('left')
      };
    });
  };

};

InlineNodeComponent.extend(ExpressionComponent);

// don't apply the default strategy to render the node inside an InlineNodeComponent
ExpressionComponent.static.isCustom = true;

module.exports = ExpressionComponent;
