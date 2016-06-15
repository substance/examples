'use strict';

var Tool = require('substance/ui/Tool');

function InsertScriptTool() {
  InsertScriptTool.super.apply(this, arguments);
}

Tool.extend(InsertScriptTool);

InsertScriptTool.static.name = 'insert-script';

module.exports = InsertScriptTool;
