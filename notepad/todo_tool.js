'use strict';

var AnnotationTool = require('substance/ui/tools/annotation_tool');

var TodoTool = AnnotationTool.extend({

  name: "todo",

  // Update toolstate according to current selection
  update: function(sel, surface) {
    var doc = this.getDocument();
    var path = sel.getPath();
    var node = doc.get(path[0]);
    var nodeType = node.type;
    var targetType;
    var active;
    
    // Set disabled when not a property selection
    if (!surface.isEnabled() || sel.isNull() || !sel.isPropertySelection()) {
      return this.setDisabled();
    }

    if (nodeType === 'paragraph') {
      targetType = 'todo';
    } else {
      targetType = 'paragraph';
      active = true;
    }

    this.setState({
      sel: sel,
      targetType: targetType,
      active: active,
      disabled: false
    });
  },

  performAction: function() {
    var surface = this.getSurface();
    var state = this.getState();
    var editor = surface.getEditor();

    // A Surface transaction performs a sequence of document operations
    // and also considers the active selection.    
    surface.transaction(function(tx, args) {
      args.data = {
        type: state.targetType
      };
      return editor.switchType(tx, args);
    });
  }

});

module.exports = TodoTool;
