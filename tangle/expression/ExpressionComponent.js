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

    this.context.documentSession.on('didUpdate', this.onSessionDidUpdated, this);

    var node = this.props.node;
    node.on('value:changed', this.rerender, this);
    node.on('toggle:showSource', this.toggleShowSource, this);
    node.getDocument().on('expression:update', this.rerender, this);
  };

  this.dispose = function() {
    _super.dispose.call(this);

    this.context.documentSession.off(this);

    var node = this.props.node;
    node.off(this);
    node.getDocument().off(this);
  };

  this.render = function($$) { // eslint-disable-line
    // if ($$.capturing) {
    //   console.log('Rendering ExpressionComponent', this.state, this.__id__);
    // }
    var node = this.props.node;
    var el = _super.render.apply(this, arguments);
    el.addClass('sc-expression');
    if (this.state.showSource) {
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
    if (this.state.showSource) {
      el = $$(TextPropertyEditor, {
        disabled: this.props.disabled,
        tagName: 'span',
        path: [node.id, 'value'],
        withoutBreak: true
      }).ref('editor');
    } else {
      el = $$('span').append(
        node.getDisplayValue()
      );
    }
    return el;
  };

  this.confirmValue = function() {
    this.extendState({ showSource: false });
    this._selectNode();
  };

  this.shouldRenderBlocker = function() {
    if (this.state.showSource) return false;
    else return true;
  };

  this.shouldSelectOnClick = function() {
    if (this.state.showSource) return false;
    else return _super.shouldRenderBlocker.call(this);
  };

  this.toggleShowSource = function() {
    this.extendState({ showSource:!this.state.showSource });
  };

  this.onSessionDidUpdated = function() {
    var selectionState = this.context.documentSession.getSelectionState();
    var annos = selectionState.getAnnotationsForType('expression-reference');
    if (annos.length === 1 && annos[0].expressionId === this.props.node.id) {
      this.el.addClass('sm-highlighted');
    } else {
      this.el.removeClass('sm-highlighted');
    }
  };

};

InlineNodeComponent.extend(ExpressionComponent);

// don't apply the default strategy to render the node inside an InlineNodeComponent
ExpressionComponent.static.isCustom = true;

module.exports = ExpressionComponent;
