'use strict';

window.$ = require('jquery');
var Substance = require('substance');
var OO = Substance.OO;
var Component = Substance.Component;
var $$ = Component.$$;

var Backend = require("./services/backend");
var Notifications = require("./services/notifications");
var TopicWriter = require("./topic_writer");

function App() {
  Component.Root.apply(this, arguments);

  this.backend = new Backend();
  this.notifications = new Notifications();

  this.childContext = {
    backend: this.backend,
    notifications: this.notifications
  };
}

App.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('app');

    // Init writer only after doc has been loaded
    if (this.state.doc) {
      el.append($$(TopicWriter, {
        doc: this.state.doc
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