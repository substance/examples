/* globals postMessage */
'use strict';

var EventEmitter = require('substance/util/EventEmitter');

function WebWorkerServerSocket(serverId, clientId) {
  WebWorkerServerSocket.super.apply(this);

  this.serverId = serverId;
  this.clientId = clientId;

  this._isSimulated = true;
  this.readyState = 1; // consider always connected
}

WebWorkerServerSocket.Prototype = function() {

  this.connect = function() {
    this.messageQueue.connectServerSocket(this);
  };

  this._onMessage = function(data) {
    this.emit('message', data);
  };

  this.send = function(data) {
    // console.log('WebWorkerServerSocket.send', data);
    var msg = {
      from: this.serverId,
      to: this.clientId,
      scope: 'substance/collab'
    };
    if (data) {
      data.scope = 'substance/collab';
      msg.data = data;
    }
    postMessage([JSON.stringify(msg)]);
  };
};

EventEmitter.extend(WebWorkerServerSocket);

module.exports = WebWorkerServerSocket;
