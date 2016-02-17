'use strict';

var AnnotationCommand = require('substance/ui/AnnotationCommand');

function TagsCommand() {
  TagsCommand.super.apply(this, arguments);
}

TagsCommand.Prototype = function() {

  this.getAnnotationData = function() {
    return {
      tags: []
    };
  };

  // When there's some overlap with only a single annotation we do an expand
  this.canEdit = function(annos, sel) {
    // jshint unused: false
    return annos.length === 1;
  };

};

AnnotationCommand.extend(TagsCommand);

TagsCommand.static.name = 'tags';
TagsCommand.static.annotationType = 'tags';

module.exports = TagsCommand;