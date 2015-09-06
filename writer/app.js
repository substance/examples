'use strict';

var $ = window.$ = require('jquery');
var Substance = require('substance');
var OO = Substance.OO;
var Component = Substance.Component;
var $$ = Component.$$;

var Backend = require("./services/backend");
var Notifications = require("./services/notifications");
var BasicWriter = require("./basic_writer");

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
    return $$('div').addClass('app').append(
      $$(BasicWriter).key('writer')
    );
  };

  this.didMount = function() {
    var self = this;
    this.backend.getDocument('sample', function(err, doc) {
      self.refs.writer.setProps({doc: doc});
    });
  };
};

OO.inherit(App, Component.Root);

$(function() {
  new App().mount($('#container'));
});