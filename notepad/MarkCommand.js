'use strict';

var AnnotationCommand = require('substance/ui/AnnotationCommand');

var ToggleMarkCommand = AnnotationCommand.extend({
  static: {
    name: 'mark',
    annotationType: 'mark'
  }
});

module.exports = ToggleMarkCommand;