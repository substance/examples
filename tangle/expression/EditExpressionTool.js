'use strict';

var clone = require('lodash/clone');
var deleteSelection = require('substance/model/transform/deleteSelection');
var Component = require('substance/ui/Component');
var Prompt = require('substance/ui/Prompt');
var DefaultDOMElement = require('substance/ui/DefaultDOMElement');
var Expression = require('./Expression');

function EditExpressionTool() {
  EditExpressionTool.super.apply(this, arguments);
}

EditExpressionTool.Prototype = function() {

  this.render = function($$) {
    var node = this.props.node;

    var el = $$('div').addClass('sc-edit-expression-tool');
    var prompt = $$(Prompt);
    prompt.append(
      $$(Prompt.Action, {
        name: 'edit-value',
        title: 'Toggle mode',
      }).on('click', this._onToggle)
    );
    if (node.variable) {
      prompt.append($$(Prompt.Separator));
      prompt.append($$(Prompt.Action, {
        name: 'drag-value',
        title: 'Drag Value',
      }).on('mousedown', this._startDragValue));
    }
    prompt.append($$(Prompt.Separator));
    prompt.append(
      $$(Prompt.Action, {
        name: 'delete',
        title: this.getLabel('delete-reference')
      }).on('click', this._onDelete)
    );
    el.append(prompt);
    return el;
  };

  this._onToggle = function() {
    this.props.node.emit('toggle:showSource');
  };

  this._onDelete = function() {
    var node = this.props.node;
    var ds = this.context.documentSession;
    ds.transaction(function(tx, args) {
      var sel = node.getSelection();
      tx.before.selection = sel;
      args.selection = sel;
      return deleteSelection(tx, args);
    });
  };

  this._startDragValue = function(event) {
    var node = this.props.node;
    var wdoc = DefaultDOMElement.wrapNativeElement(window.document);
    wdoc.on('mousemove', this._onDragValue, this);
    wdoc.on('mouseup', this._finishDragValue, this);
    this._startX = event.clientX;
    this._value = node.getEvaluatedValue();
  };

  this._onDragValue = function(event) {
    var node = this.props.node;
    console.log('UPDATING VALUE');
    var diff = event.clientX - this._startX;
    if (node.units) {
      diff *= Expression.UNITS[node.units];
    }
    var prelimValue = this._value + diff;
    console.log('#### ', prelimValue);
    node._preliminaryValue = prelimValue;
    node.getDocument().emit('expression:update');
  };

  this._finishDragValue = function() {
    var wdoc = DefaultDOMElement.wrapNativeElement(window.document);
    wdoc.off(this);

    var node = this.props.node;
    var ds = this.context.documentSession;
    var newVal = node._preliminaryValue;
    delete node._preliminaryValue;
    if (node.value !== newVal) {
      ds.transaction(function(tx) {
        tx.set([node.id, 'value'], newVal);
      });
    }
    node.getDocument().emit('expression:update');
  };


};

Component.extend(EditExpressionTool);

EditExpressionTool.static.getProps = function(commandStates) {
  if (commandStates['expression'].active) {
    return clone(commandStates['expression']);
  } else {
    return undefined;
  }
};

EditExpressionTool.static.name = 'edit-expression';

module.exports = EditExpressionTool;