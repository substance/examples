/* globals Worker */
'use strict';

var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');

function App() {
  App.super.apply(this, arguments);

  // messages from clients
  window.onmessage = function(msg) {
    this.onMessage(msg.data);
  }.bind(this);

  this.hub = new Worker('hub.js');
  // messages from server
  this.hub.onmessage = function(e) {
    this.onMessage(JSON.parse(e.data));
  }.bind(this);

}

App.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-two-editors');
    el.append(
      $$(SplitPane, {
        splitType: 'vertical',
        sizeA: '50%'
      }).append(
        $$('iframe').attr('src', 'client.html?id=user1').ref('user1'),
        $$('iframe').attr('src', 'client.html?id=user2').ref('user2')
      )
    );
    return el;
  };

  this.onMessage = function(msg) {
    // console.log('App.onMessage', msg);
    var receiver = msg.to;
    switch(receiver) {
      case 'server':
        // console.log('Sending message to hub');
        this.hub.postMessage([msg]);
        break;
      case 'user1':
        // console.log('Sending message to user1');
        this.refs.user1.getNativeElement().contentWindow.postMessage(JSON.stringify(msg), '*');
        break;
      case 'user2':
        // console.log('Sending message to user2');
        this.refs.user2.getNativeElement().contentWindow.postMessage(JSON.stringify(msg), '*');
        break;
      default:
        // nothing
    }
  };
};

Component.extend(App);

window.onload = function() {
  var app = new App();
  setTimeout(function() {
    app.mount(window.document.body);
  }, 250);
};
