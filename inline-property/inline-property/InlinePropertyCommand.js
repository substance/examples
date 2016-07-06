'use strict';

var InlineNodeCommand = require('substance/ui/InlineNodeCommand');
var InlineProperty = require('./InlineProperty');

function InlinePropertyCommand() {
  InlinePropertyCommand.super.apply(this, arguments);
}

InlinePropertyCommand.Prototype = function() {

  this.getCommandState = function(props, context) {
    var sel = context.documentSession.getSelection();
    var newState = {
      disabled: true,
      active: false,
      node: undefined
    };
    if (!sel || sel.isNull() || !sel.isPropertySelection()) {
      return newState;
    }
    newState.disabled = false;
    var doc = context.documentSession.getDocument();
    var node = doc.get(sel.path[0]);
    if (node && node.type === 'inline-property') {
      newState.active = true;
      newState.node = node;
    } else {
      var annos = this._getAnnotationsForSelection(props, context);
      if (annos.length === 1 && annos[0].getSelection().equals(sel)) {
        newState.active = true;
        newState.node = annos[0];
      }
    }
    return newState;
  };

};

InlineNodeCommand.extend(InlinePropertyCommand);

InlinePropertyCommand.static.name = InlineProperty.static.name;

module.exports = InlinePropertyCommand;
