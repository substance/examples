'use strict';

var AnnotationTool = require('substance/ui/tools/annotation_tool');

var CommentTool = AnnotationTool.extend({
  static: {
    name: 'Comment',
    command: 'toggleComment'
  },

  didMount: function() {
  	this.super.didMount.call(this);
  	var ctrl = this.getController();
  	ctrl.connect(this, {
  		'command:executed': this.onCommandExecuted
  	});
  },

  onCommandExecuted: function(info, commandName) {
  	if (commandName === this.constructor.static.command && info.mode === 'create') {
  		// console.log(info)
  		// this.send()
  	}
  }
});

module.exports = CommentTool;