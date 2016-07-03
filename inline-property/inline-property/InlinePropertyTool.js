'use strict';

var AnnotationTool = require('substance/ui/AnnotationTool');
var InlinePropertyCommand = require('./InlinePropertyCommand');

function InlinePropertyTool() {
  InlinePropertyTool.super.apply(this, arguments);
}

AnnotationTool.extend(InlinePropertyTool);

InlinePropertyTool.static.name = InlinePropertyCommand.static.name;

module.exports = InlinePropertyTool;
