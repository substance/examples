'use strict';

var AnnotationCommand = require('substance/ui/commands/toggle_annotation');

var ToggleCommentCommand = AnnotationCommand.extend({
  static: {
    name: 'toggleComment',
    annotationType: 'comment'
  },

  executeCreate: function() {
    return {
      mode: 'create'
    };
  };

  getAnnotationData: function() {
    return {
      content: "<p></p>",
    };
  }
});

module.exports = ToggleCommentCommand;