'use strict';

var AnnotationCommand = require('substance/ui/commands/toggle_annotation');

var ToggleCommentCommand = AnnotationCommand.extend({
  static: {
    name: 'toggleComment',
    annotationType: 'comment'
  },

  afterCreate: function() {
    console.log("TODO: request app state change. problem: commands currently don't have access to the app context");
  },

  getAnnotationData: function() {
    return {
      content: "<p></p>",
    };
  }
});

module.exports = ToggleCommentCommand;