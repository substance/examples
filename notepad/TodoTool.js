'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');

var TodoTool = SurfaceTool.extend({
  static: {
    name: 'todo',
    command: 'todo'
  }
});

module.exports = TodoTool;
