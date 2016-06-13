'use strict';

var Tool = require('substance/ui/Tool');

function InsertEntityTool() {
  InsertEntityTool.super.apply(this, arguments);
}

Tool.extend(InsertEntityTool);

InsertEntityTool.static.name = 'insert-entity';

module.exports = InsertEntityTool;
