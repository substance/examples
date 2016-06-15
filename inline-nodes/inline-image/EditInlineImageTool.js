'use strict';

var Component = require('substance/ui/Component');
var clone = require('lodash/clone');
var Prompt = require('substance/ui/Prompt');
var deleteSelection = require('substance/model/transform/deleteSelection');

function EditInlineImageTool() {
  EditInlineImageTool.super.apply(this, arguments);
}

EditInlineImageTool.Prototype = function() {

  this._onDelete = function() {
    var ds = this.context.documentSession;
    ds.transaction(function(tx, args) {
      return deleteSelection(tx, args);
    });
  };

  this.render = function($$) {
    var node = this.props.node;
    var el = $$('div').addClass('sc-edit-inline-image-tool');

    el.append(
      $$(Prompt).append(
        $$(Prompt.Input, {
          type: 'url',
          path: [node.id, 'src'],
          placeholder: 'Paste or type an image url'
        }),
        $$(Prompt.Separator),
        $$(Prompt.Action, {name: 'delete', title: this.getLabel('delete-reference')})
          .on('click', this._onDelete)
      )
    );
    return el;
  };
};

Component.extend(EditInlineImageTool);

EditInlineImageTool.static.getProps = function(commandStates) {
  if (commandStates['inline-image'].active) {
    return clone(commandStates['inline-image']);
  } else {
    return undefined;
  }
};

EditInlineImageTool.static.name = 'edit-inline-image';

module.exports = EditInlineImageTool;