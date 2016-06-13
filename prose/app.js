'use strict';

var Component = require('substance/ui/Component');
var Configurator = require('substance/util/Configurator');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');

var poem = require('./poem');
var DocumentSession = require('substance/model/DocumentSession');
var configurator = new Configurator(ProseEditorPackage);

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {
  this.render = function($$) {
    var el = $$('div').addClass('app');
    el.append($$(ProseEditor, {
      documentSession: this.props.documentSession,
      configurator: configurator
    }));
    return el;
  };
};

Component.extend(App);

window.onload = function() {
  // Creates a ProseArticle based on the ProseEditorConfig
  var doc = configurator.createArticle(poem);
  var documentSession = new DocumentSession(doc);

  // For debugging
  window.doc = doc;
  window.documentSession = documentSession;

  Component.mount(App, {
    documentSession: documentSession
  }, 'body');
};
