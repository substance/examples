'use strict';

var $ = window.$ = require('substance/util/jquery');
var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var TaleEditor = require('./TaleEditor');
var Tale = require('./tale');
var MetaDataTool = require('./MetaDataTool');
var $$ = Component.$$;

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('app');

    var editor = $$(TaleEditor, {
      doc: this.props.doc
    });

    editor.outlet('tools').append(
      $$(MetaDataTool).append($$(Icon, {icon: 'fa-book'}))
    );

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