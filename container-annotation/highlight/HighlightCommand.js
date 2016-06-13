'use strict';

var AnnotationCommand = require('substance/ui/AnnotationCommand');

function HighlightCommand() {
  HighlightCommand.super.apply(this, arguments);
}

AnnotationCommand.extend(HighlightCommand);

HighlightCommand.static.name = 'highlight';

module.exports = HighlightCommand;