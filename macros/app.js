'use strict';

var Component = require('substance/ui/Component');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var Configurator = require('substance/util/Configurator');

var fixture = require('./fixture');
var EditorConfig = require('./MyProseEditorConfig');
var DocumentSession = require('substance/model/DocumentSession');
var configurator = new Configurator();
configurator.import(EditorConfig);

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
  var doc = configurator.createArticle(fixture);
  var documentSession = new DocumentSession(doc);

  // For debugging
  window.doc = doc;
  window.documentSession = documentSession;

  Component.mount(App, {
    documentSession: documentSession
  }, 'body');
};
