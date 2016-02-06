'use strict';

var doc1 = require('../simple/exampleDoc');
var doc2 = require('../simple/exampleDoc2');
var MessageQueue = require('substance/util/MessageQueue');
var CollabSession = require('substance/model/CollabSession');
var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');
var Editor = require('../simple/Editor');
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
        $$(Editor, {documentSession: this.props.session1}).ref('left').addClass('left-editor'),
        $$(Editor, {documentSession: this.props.session2}).ref('right')
      )
    );
    return el;
  };
};

Component.extend(TwoEditors);

window.onload = function() {
  var messageQueue = new MessageQueue();
  // Create two CollabSessions for the same doc
  var session1 = new CollabSession(doc1, {messageQueue: messageQueue});
  var session2 = new CollabSession(doc2, {messageQueue: messageQueue});
  TwoEditors.static.mount({
    session1: session1,
    session2: session2
  }, 'body');
};
