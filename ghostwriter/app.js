'use strict';

var exampleDoc = require('./exampleDoc');
var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');
var Editor = require('../simple/Editor');
var Ghost = require('./Ghost');
var GhostEditor = require('./GhostEditor');
var $$ = Component.$$;

function TwoEditors() {
  TwoEditors.super.apply(this, arguments);
}

TwoEditors.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('sc-two-editors');
    el.append(
      $$(SplitPane, {
          splitType: 'vertical',
          sizeA: '50%'
        }).append(
        $$(Editor, {doc: this.props.doc}).ref('left'),
        $$(GhostEditor, {
          doc: this.props.doc
        }).ref('right')
      )
    );
    return el;
  };

  this.didMount = function() {
    var ghostEditor = this.refs.right;
    var ghost = new Ghost(ghostEditor.refs.surface);
    ghost.start();
  };

};

Component.extend(TwoEditors);

window.onload = function() {
  var doc = exampleDoc;
  TwoEditors.static.mount({
    doc: doc
  }, 'body');
};
