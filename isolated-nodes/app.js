'use strict';

var DocumentSession = require('substance/model/DocumentSession');
var Component = require('substance/ui/Component');
var Configurator = require('substance/util/Configurator');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');

var Config = require('./IsolatedNodesConfig');
var fixture = require('./fixture');

function App() {
  App.super.apply(this, arguments);

  var configurator = new Configurator();
  configurator.import(Config);
  var doc = configurator.createArticle(fixture);
  var documentSession = new DocumentSession(doc);

  // HACK: it would be better to have icon mapping supported by configurator, too
  var iconProvider = configurator.getIconProvider();
  iconProvider.addIcon('insert-entity', 'fa-space-shuttle');
  iconProvider.addIcon('insert-container', 'fa-file-text-o');


  this.configurator = configurator;
  this.documentSession = documentSession;
}

App.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('app');

    var editor = $$(ProseEditor, {
      configurator: this.configurator,
      documentSession: this.documentSession
    });
    el.append(editor);
    return el;
  };
};

Component.extend(App);

window.onload = function() {
  Component.mount(App, 'body');
};
