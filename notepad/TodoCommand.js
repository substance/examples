'use strict';

var SurfaceCommand = require('substance/ui/SurfaceCommand');

var TodoCommand = function(surface) {
  SurfaceCommand.call(this, surface);
};

TodoCommand.Prototype = function() {

  this.getSelection = function() {
    return this.getSurface().getSelection();
  };

  this.getTargetType = function() {
    var sel = this.getSelection();
    if (sel.isNull() || !sel.isPropertySelection()) return null;
    var doc = this.getDocument();
    var path = sel.getPath();
    var node = doc.get(path[0]);
    // HACK: We should make sure the getCommandState is not called for
    // an invalid selection.
    if (!node) return 'paragraph';
    var nodeType = node.type;

    if (nodeType === 'todo') {
      return 'paragraph';
    } else {
      return 'todo';
    }
  };

  this.getCommandState = function() {
    var surface = this.getSurface();
    var sel = this.getSelection();
    var disabled = !surface.isEnabled() || sel.isNull() || !sel.isPropertySelection();
    var targetType = this.getTargetType();

    return {
      targetType: targetType,
      active: targetType !== 'todo',
      disabled: disabled
    };
  };

  // Execute command and trigger transformations
  this.execute = function() {
    var sel = this.getSelection();
    if (!sel.isPropertySelection()) return;
    var surface = this.getSurface();
    var targetType = this.getTargetType();

    if (targetType) {
      // A Surface transaction performs a sequence of document operations
      // and also considers the active selection.    
      surface.transaction(function(tx, args) {
        args.data = {
          type: targetType
        };
        return surface.switchType(tx, args);
      });
      return {status: 'ok'};
    }
  };
};

SurfaceCommand.extend(TodoCommand);

TodoCommand.static.name = 'todo';

module.exports = TodoCommand;
