'use strict';

var AnnotationTool = require('substance/ui/tools/annotation_tool');

var CommentTool = AnnotationTool.extend({
  static: {
    name: 'Comment',
    command: 'toggleComment'
  }
});

module.exports = CommentTool;