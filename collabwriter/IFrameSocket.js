'use strict';

var uuid = require('substance/util/uuid');
var EventEmitter = require('substance/util/EventEmitter');
var TestWebSocket = require('substance/test/collab/TestWebSocket');

function IFrameSocket(config) {
  EventEmitter.call(this);

  this.clientId = config.clientId || uuid();
  this.serverId = config.serverId || "server";
  this.scope = config.scope;

  // We consider our TestWebSocket WebSocket.CLOSED at the beginning
  this.readyState = 3;
  this._isSimulated = true;

  this._onMessage = this._onMessage.bind(this);
}

IFrameSocket.Prototype = function() {

  this.connect = function() {
    window.addEventListener("message", this._onMessage);
    this.send('__connect__');
    this.readyState = 1; // WebSocket.OPEN
    this.triggerOpen();
  };

  this.disconnect = function() {
    this.send('__disconnect__');
    window.removeEventListener("message", this._onMessage);
    this.readyState = 3; // WebSocket.CLOSED
    this.triggerClose();
  };

  this.send = function(data) {
    // console.log('IFrameSocket.send', data);
    var msg = {
      from: this.clientId,
      to: this.serverId,
      scope: this.scope
    };
    if (data) {
      msg.data = data;
    }
    window.top.postMessage(msg, '*');
  };

  this._onMessage = function(evt) {
    var msg = JSON.parse(evt.data);
    this.onmessage(msg);
  };

};

TestWebSocket.extend(IFrameSocket);

module.exports = IFrameSocket;
