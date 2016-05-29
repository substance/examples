'use strict';

var Tool = require('substance/ui/Tool');

function InsertContainerTool() {
  InsertContainerTool.super.apply(this, arguments);
}

Tool.extend(InsertContainerTool);

InsertContainerTool.static.name = 'insert-container';

module.exports = InsertContainerTool;
