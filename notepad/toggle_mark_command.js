'use strict';

var AnnotationCommand = require('substance/surface/commands/toggle_annotation');

var ToggleMarkCommand = AnnotationCommand.extend({
  static: {
    name: 'toggleMark',
    annotationType: 'mark'
  }
});


module.exports = ToggleMarkCommand;