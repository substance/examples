'use strict';

var Configurator = require('substance/util/Configurator');
var Component = require('substance/ui/Component');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var DocumentSession = require('substance/model/DocumentSession');

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {
  this.render = function($$) {
    var el = $$('div').addClass('app');
    el.append($$(ProseEditor, {
      documentSession: this.props.documentSession,
      configurator: this.props.configurator
    }));
    return el;
  };
};

Component.extend(App);

module.exports = function(fixture, config) {
  var configurator = new Configurator(config);
  window.onload = function() {
    // Creates a ProseArticle based on the ProseEditorConfig
    var doc = configurator.createArticle(fixture);
    var documentSession = new DocumentSession(doc);
    Component.mount(App, {
      documentSession: documentSession,
      configurator: configurator
    }, 'body');
  };
};

