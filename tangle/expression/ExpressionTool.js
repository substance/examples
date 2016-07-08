'use strict';

var AnnotationTool = require('substance/ui/AnnotationTool');

function ExpressionTool() {
  ExpressionTool.super.apply(this, arguments);
}

AnnotationTool.extend(ExpressionTool);
ExpressionTool.static.name = 'expression';

module.exports = ExpressionTool;