'use strict';

var Component = require('substance/ui/Component');
var Controller = require('substance/ui/Controller');
var ContainerEditor = require('substance/ui/ContainerEditor');
var Editor = require('../simple/Editor');
var $$ = Component.$$;

function GhostEditor() {
  Controller.apply(this, arguments);
}

GhostEditor.Prototype = function() {

  this.render = function() {
    return $$('div')
      .addClass('sc-ghost-editor')
      .append(
        $$(ContainerEditor, {
          name: 'bodyEditor',
          containerId: 'body',
          editing: 'readonly'
        }).ref('surface')
      );
  };

};

Controller.extend(GhostEditor);

GhostEditor.static.config = Editor.static.config;

module.exports = GhostEditor;
