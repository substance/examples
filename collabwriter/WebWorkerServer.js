'use strict';

var map = require('lodash/map');
var EventEmitter = require('substance/util/EventEmitter');
var WebWorkerServerSocket = require('./WebWorkerServerSocket');

function WebWorkerServer(config) {
  WebWorkerServer.super.apply(this);
  this.serverId = config.serverId || "server";
  this.clients = {};
  this._isSimulated = true;
  this.connect();
}

WebWorkerServer.Prototype = function() {

  this.connect = function() {
    var self = this;
    this._onMessage = function(msg) {
      self.onMessage.apply(self, msg);
    };
  };

  this.disconnect = function() {
    this._onMessage = function() {
      console.log('WebWorkerServer is not connected');
    };
  };

  this.onMessage = function(msg) {
    console.log('WebWorkerServer received msg', msg);
    var from = msg.from;
    var to = msg.to;
    if (msg.data === '__connect__') {
      this.handleConnectionRequest(from);
    } else if (msg.data === '__disconnect__') {
      this.handleDisconnectRequest(from);
    } else {
      var sws = this.clients[from];
      sws.emit('message', msg.data);
    }
  };

  /*
    New websocket connection requested. Creates the server-side
    counterpart of the websocket and registers it in the message
    queue.
  */
  this.handleConnectionRequest = function(clientId) {
    var sws = new WebWorkerServerSocket(this.serverId, clientId);
    this.clients[clientId] = sws;
    this.emit('connection', sws);
  };

  /*
    Disconnect an existing websocket
  */
  this.handleDisconnectRequest = function(clientId) {
    var sws = this.clients[clientId];
    // Emit close event on websocket server
    sws.emit('close', sws);
    delete this.clients[clientId];
  };
};

EventEmitter.extend(WebWorkerServer);
module.exports = WebWorkerServer;

