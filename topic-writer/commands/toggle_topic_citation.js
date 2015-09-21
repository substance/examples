'use strict';

var AnnotationCommand = require('substance/ui/commands/toggle_annotation');

var ToggleTopicCitationCommand = AnnotationCommand.extend({
  static: {
    name: 'toggleTopicCitation',
    annotationType: 'topic_citation'
  },

  afterCreate: function() {
    console.log("TODO: request app state change. problem: commands currently don't have access to the app context");
  },

  getAnnotationData: function() {
    return {
      target: null
    };
  }
});

module.exports = ToggleTopicCitationCommand;