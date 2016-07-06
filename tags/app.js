'use strict';

var $ = window.$ = require('substance/util/jquery');
var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var TagsTool = require('./tags/TagsTool');
var TagsEditor = require('./tagsEditor');
var Article = require('./article');
var $$ = Component.$$;

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('app');

    var editor = $$(TagsEditor, {
      doc: this.props.doc
    });

    editor.outlet('tools').append(
      $$(TagsTool).append($$(Icon, {icon: 'fa-tags'}))
    );

    el.append(editor);

    return el;
  };
};

Component.extend(App);

$(function() {
  var doc = new Article();
  doc.loadSample();
  //var doc = Article.create();
  //Article.sample(doc);
  // For debugging in the console
  window.doc = doc;

  Component.mount(App, {
    doc: doc
  }, 'body');
});