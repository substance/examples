'use strict';

var exampleDoc = require('substance/test/fixtures/collab/poem');
var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var GhostEditor = require('./GhostEditor');

function TwoEditors() {
  TwoEditors.super.apply(this, arguments);
}

TwoEditors.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-two-editors');
    el.append(
      $$(SplitPane, {
          splitType: 'vertical',
          sizeA: '50%'
        }).append(
        $$(ProseEditor, {doc: this.props.doc}).ref('left').addClass('sm-left-editor'),
        $$(GhostEditor, {
          doc: this.props.doc
        }).ref('right')
      )
    );
    return el;
  };
};

Component.extend(TwoEditors);

window.onload = function() {
  var doc = exampleDoc.createArticle();
  TwoEditors.static.mount({
    doc: doc
  }, 'body');
};
