'use strict';

var AnnotationTool = require('../../ui/AnnotationTool');

function HighlightTool() {
  HighlightTool.super.apply(this, arguments);
}
AnnotationTool.extend(HighlightTool);

HighlightTool.static.name = 'higlight';

module.exports = HighlightTool;