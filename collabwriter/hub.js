'use strict';

var oo = require('substance/util/oo');

var DocumentStore = require('substance/collab/DocumentStore');
var ChangeStore = require('substance/collab/ChangeStore');
var DocumentEngine = require('substance/collab/DocumentEngine');
var TestCollabServer = require('substance/test/collab/TestCollabServer');
var WebWorkerServer = require('./WebWorkerServer');

var createTestDocumentFactory = require('substance/test/fixtures/createTestDocumentFactory');
var twoParagraphs = require('substance/test/fixtures/twoParagraphs');
var documentStoreSeed = require('substance/test/fixtures/documentStoreSeed');
var changeStoreSeed = require('substance/test/fixtures/changeStoreSeed');

function Hub() {
  this.documentStore = new DocumentStore().seed(documentStoreSeed);
  this.changeStore = new ChangeStore().seed(changeStoreSeed);

  this.documentEngine = new DocumentEngine({
    documentStore: this.documentStore,
    changeStore: this.changeStore,
    schemas: {
      'prose-article': {
        name: 'prose-article',
        version: '1.0.0',
        documentFactory: createTestDocumentFactory(twoParagraphs)
      }
    }
  });

  this.collabServer = new TestCollabServer({
    documentEngine: this.documentEngine
  });

  this.wss = new WebWorkerServer({
    serverId: 'hub'
  });
}

Hub.Prototype = function() {

  this.start = function() {
    this.collabServer.bind(this.wss);
  };

};

oo.initClass(Hub);

var hub = new Hub();

onmessage = function(evt) { // eslint-disable-line
  hub.wss._onMessage(evt.data);
};

hub.start();

console.info('Started Hub');
