'use strict';

var AnnotationTool = require('substance/ui/AnnotationTool');

function MarkTool() {
  MarkTool.super.apply(this, arguments);
}

AnnotationTool.extend(MarkTool);

MarkTool.static.name = 'mark';
MarkTool.static.command = 'mark';

module.exports = MarkTool;