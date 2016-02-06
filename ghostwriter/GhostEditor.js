'use strict';

var Component = require('substance/ui/Component');
var Controller = require('substance/ui/Controller');
var Toolbar = require('substance/ui/Toolbar');
var SplitPane = require('substance/ui/SplitPane');
var ScrollPane = require('substance/ui/ScrollPane');
var ContainerEditor = require('substance/ui/ContainerEditor');
var Editor = require('../simple/Editor');
var Ghost = require('./Ghost');
var $$ = Component.$$;

function GhostEditor() {
  Controller.apply(this, arguments);
}

GhostEditor.Prototype = function() {

  this.render = function() {
    var el = $$('div')
      .addClass('sc-ghost-editor');

    var toolbar = $$(Toolbar).append(
      $$(Toolbar.Group).append(
        $$('button')
          .ref('startButton')
          .on('click', this.onStartStop)
          .text('Start')
      )
    );

    var editor = $$(ContainerEditor, {
      name: 'bodyEditor',
      containerId: 'body',
      editing: 'readonly'
    }).ref('surface');

    el.append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        toolbar,
        $$(ScrollPane, {scrollbarType: 'substance', scrollbarPosition: 'right'}).ref('contentPanel').append(editor)
      )
    );
    return el;
  };

  this.didMount = function() {
    this.ghost = new Ghost(this.refs.surface);
    // this.onStartStop();
  };

  this.onStartStop = function() {
    if (this.ghost.isRunning()) {
      this.ghost.stop();
      this.refs.startButton.text('Start');
    } else {
      this.ghost.start();
      this.refs.startButton.text('Stop');
    }
  };

};

Controller.extend(GhostEditor);

GhostEditor.static.config = Editor.static.config;

module.exports = GhostEditor;
