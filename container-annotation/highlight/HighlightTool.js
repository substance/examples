'use strict';

var AnnotationTool = require('substance/ui/AnnotationTool');

function HighlightTool() {
  HighlightTool.super.apply(this, arguments);
}
AnnotationTool.extend(HighlightTool);

HighlightTool.static.name = 'highlight';

module.exports = HighlightTool;