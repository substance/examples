"use strict";

var TestWebSocketConnection = require('substance/test/collab/TestWebSocketConnection');
var IFrameSocket = require('./IFrameSocket');

/*
  Browser WebSocket abstraction. Handles reconnects etc.
*/
function IFrameSocketConnection() {
  IFrameSocketConnection.super.apply(this, arguments);
}

IFrameSocketConnection.Prototype = function() {

  this._createWebSocket = function() {
    // this.config has messageQueue, clientId, serverId
    var ws = new IFrameSocket(this.config);
    return ws;
  };

};

TestWebSocketConnection.extend(IFrameSocketConnection);
module.exports = IFrameSocketConnection;
