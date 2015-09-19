'use strict';

var AnnotationTool = require('substance/ui/tools/annotation_tool');

var TopicCitationTool = AnnotationTool.extend({
  static: {
    name: 'Topic Citation',
    command: 'toggleTopicCitation'
  }
});

module.exports = TopicCitationTool;