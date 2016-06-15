'use strict';

var AnnotationTool = require('substance/ui/AnnotationTool');

function InlineImageTool() {
  InlineImageTool.super.apply(this, arguments);
}

AnnotationTool.extend(InlineImageTool);
InlineImageTool.static.name = 'inline-image';

module.exports = InlineImageTool;