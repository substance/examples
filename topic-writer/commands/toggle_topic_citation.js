'use strict';

var AnnotationCommand = require('substance/ui/commands/toggle_annotation');

var ToggleTopicCitationCommand = AnnotationCommand.extend({
  static: {
    name: 'toggleTopicCitation',
    annotationType: 'topic_citation'
  },

  executeCreate: function() {
    return {
      mode: 'create'
    };
  },

  getAnnotationData: function() {
    return {
      target: null
    };
  },

  canDelete: function() {
    return false;
  }
});

module.exports = ToggleTopicCitationCommand;