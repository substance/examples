'use strict';

var AnnotationTool = require('substance/ui/tools/annotation_tool');

var MarkTool = AnnotationTool.extend({
  static: {
    name: 'mark',
    command: 'toggleMark'
  }
});

module.exports = MarkTool;