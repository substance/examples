'use strict';

var clone = require('lodash/clone');
var deleteSelection = require('substance/model/transform/deleteSelection');
var Component = require('substance/ui/Component');
var Prompt = require('substance/ui/Prompt');

function EditExpressionTool() {
  EditExpressionTool.super.apply(this, arguments);
}

EditExpressionTool.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-edit-expression-tool');
    var prompt = $$(Prompt);
    prompt.append(
      $$(Prompt.Action, {
        name: 'edit-value',
        title: 'Toggle mode',
      }).on('click', this._onToggle)
    );
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
    var showSource = !this.props.node.showSource;
    var node = this.props.node;
    var ds = this.context.documentSession;
    var sel;
    if (showSource) {
      sel = ds.createSelection({
        type: 'property',
        path: [node.id, 'value'],
        startOffset: 0
      });
    } else {
      sel = node.getSelection();
    }
    ds.transaction(function(tx) {
      tx.set([node.id, 'showSource'], showSource);
      return { selection: sel };
    });
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