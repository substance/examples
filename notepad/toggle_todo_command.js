'use strict';

var OO = require('substance/basics/oo');
var Command = require('substance/surface/commands/command');

var ToggleTodoCommand = function(surface) {
  Command.call(this, surface);
};

ToggleTodoCommand.Prototype = function() {
  this.static = {
    name: 'toggleTodo'
  };

  this.getSelection = function() {
    return this.getSurface().getSelection();
  };

  this.getTargetType = function() {
    var sel = this.getSelection();

    if (sel.isNull() || !sel.isPropertySelection()) return null;

    var doc = this.getDocument();
    var path = sel.getPath();
    var node = doc.get(path[0]);
    var nodeType = node.type;
    

    if (nodeType === 'paragraph') {
      return 'todo';
    } else {
      return 'paragraph';
    }
  };

  // Execute command and trigger transformations
  this.execute = function() {
    var sel = this.getSelection();
    if (!sel.isPropertySelection()) return;

    var surface = this.getSurface();
    var editor = surface.getEditor();
    var targetType = this.getTargetType();

    if (targetType) {
      // A Surface transaction performs a sequence of document operations
      // and also considers the active selection.    
      surface.transaction(function(tx, args) {
        args.data = {
          type: targetType
        };
        return editor.switchType(tx, args);
      });      
    }
  };

};

OO.inherit(ToggleTodoCommand, Command);

module.exports = ToggleTodoCommand;