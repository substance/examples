'use strict';

var AnnotationCommand = require('substance/ui/commands/toggle_annotation');

var ToggleTopicCitationCommand = AnnotationCommand.extend({
  static: {
    name: 'toggleTopicCitation',
    annotationType: 'topic_citation'
  },

  getAnnotationData: function() {
    return {
      target: null
    };
  }
});

module.exports = ToggleTopicCitationCommand;