'use strict';

var $ = window.$ = require('substance/util/jquery');
var Component = require('substance/ui/Component');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var Tale = require('./tale');
var $$ = Component.$$;

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('app');

    var editor = $$(ProseEditor, {
      doc: this.props.doc
    });

    el.append(editor);

    return el;
  };
};

Component.extend(App);

$(function() {
  var doc = new Tale();
  doc.loadSample();

  window.doc = doc;

  Component.mount(App, {
    doc: doc
  }, 'body');
});