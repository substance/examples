'use strict';

var AnnotationCommand = require('substance/ui/commands/toggle_annotation');

var ToggleMarkCommand = AnnotationCommand.extend({
  static: {
    name: 'toggleMark',
    annotationType: 'mark'
  }
});


module.exports = ToggleMarkCommand;