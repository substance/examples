'use strict';

var Component = require('substance/ui/Component');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var example = require('substance/test/fixtures/collab/poem');
var Config = require('./MyProseEditorConfig');

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('app');
    el.append($$(ProseEditor, {
      doc: this.props.doc,
      config: Config
    }));
    return el;
  };
};

Component.extend(App);

window.onload = function() {
  var doc = example.createArticle();
  // For debugging
  window.doc = doc;
  Component.mount(App, { doc: doc }, 'body');
};
