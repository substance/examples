'use strict';

var AnnotationTool = require('substance/ui/AnnotationTool');

var MarkTool = AnnotationTool.extend({
  static: {
    name: 'mark',
    command: 'mark'
  }
});

module.exports = MarkTool;