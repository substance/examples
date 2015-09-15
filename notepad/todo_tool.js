'use strict';

var SurfaceTool = require('substance/ui/tools/surface_tool');

var TodoTool = SurfaceTool.extend({
  static: {
    name: 'todo',
    command: 'toggleTodo'
  },

  // Update toolstate according to current selection
  update: function(sel, surface) {

    if (!surface.isEnabled() || sel.isNull() || !sel.isPropertySelection()) {
      return this.setDisabled();
    }

    var command = this.getCommand();
    var targetType = command.getTargetType();

    this.setState({
      targetType: targetType,
      active: targetType !== 'todo',
      disabled: false
    });
  },

  performAction: function() {
    var cmd = this.getCommand();
    cmd.execute();
  }

});

module.exports = TodoTool;
