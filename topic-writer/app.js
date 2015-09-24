'use strict';

window.$ = require('jquery');

var Substance = require('substance');
var OO = Substance.OO;
var Component = Substance.Component;
var $$ = Component.$$;
var Backend = require("./services/backend");
var TopicWriter = require("./topic_writer");

function App() {
  Component.Root.apply(this, arguments);

  this.backend = new Backend();

  // We make this available to child components if they need access to the
  // backend too
  this.childContext = {
    backend: this.backend,
  };

  this.actions({
    'saveDocument': this.saveDocument
  });
}

App.Prototype = function() {

  this.saveDocument = function(doc, changes, cb) {
    setTimeout(function() {
      console.log('We pretend to save the document...');
      cb(null);
    }, 2000);
  },

  this.render = function() {
    var el = $$('div').addClass('app');

    // Inject Writer only after doc has been loaded
    if (this.state.doc) {
      el.append($$(TopicWriter, {
        doc: this.state.doc,
        onDocumentSave: function(doc, changes, cb) {
          setTimeout(function() {
            console.log('We pretend to save the document...');
            cb(null);
          }, 2000);
        }
      }).ref('writer'));
    }
    return el;
  };

  this.didMount = function() {
    this.backend.getDocument('sample', function(err, doc) {
      this.setState({
        doc: doc
      });
    }.bind(this));
  };
};

OO.inherit(App, Component);

$(function() {
  Component.mount($$(App), $('#container'));
});