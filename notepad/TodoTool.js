'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');

function TodoTool() {
  TodoTool.super.apply(this, arguments);
}

SurfaceTool.extend(TodoTool);

TodoTool.static.name = 'todo';
TodoTool.static.command = 'todo';

module.exports = TodoTool;
