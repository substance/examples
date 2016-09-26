/* globals Worker */
// 'use strict';

// var Component = require('substance/ui/Component');
// var SplitPane = require('substance/ui/SplitPane');
// var Client = require('./client');
// var twoParagraphs = require('substance/test/fixtures/twoParagraphs');

// var MessageQueue = require('substance/test/collab/MessageQueue');
// var TestWebSocketServer = require('substance/test/collab/TestWebSocketServer');
// var TestWebSocketConnection = require('substance/test/collab/TestWebSocketConnection');
// var TestCollabServer = require('substance/test/collab/TestCollabServer');

// var DocumentEngine = require('substance/collab/DocumentEngine');
// var DocumentStore = require('substance/collab/DocumentStore');
// var ChangeStore = require('substance/collab/ChangeStore');
// var documentStoreSeed = require('substance/test/fixtures/documentStoreSeed');
// var changeStoreSeed = require('substance/test/fixtures/changeStoreSeed');
// var createTestDocumentFactory = require('substance/test/fixtures/createTestDocumentFactory');

const {
  Component, SplitPane, twoParagraphs, MessageQueue, TestWebSocketServer,
  TestWebSocketConnection, TestCollabServer, DocumentEngine, DocumentStore,
  ChangeStore, documentStoreSeed, changeStoreSeed, createTestDocumentFactory
} = substance

/*
  App
*/

class App extends Component {

  constructor(...args) {
    super(...args)

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

    this.messageQueue = new MessageQueue();
    this.wss = new TestWebSocketServer({
      messageQueue: this.messageQueue,
      serverId: 'hub'
    });
    this.collabServer = new TestCollabServer({
      documentEngine: this.documentEngine
    });
    this.collabServer.bind(this.wss);

    this.conn1 = new TestWebSocketConnection({
      messageQueue: this.messageQueue,
      clientId: 'user1',
      serverId: 'hub',
    });
    this.conn2 = new TestWebSocketConnection({
      messageQueue: this.messageQueue,
      clientId: 'user2',
      serverId: 'hub'
    });

    this.messageQueue.flush();
    this.messageQueue.start();

    this.handleAction('switchUser', this.switchUser);

  }

  render($$) {
    var el = $$('div').addClass('sc-two-editors');
    el.append(
      $$(SplitPane, {
        splitType: 'vertical',
        sizeA: '50%'
      }).append(
        $$(Client, {
          userId: 'user1',
          connection: this.conn1
        }).ref('user1'),
        $$(Client, {
          userId: 'user2',
          connection: this.conn2,
          disabled: true
        }).ref('user2')
      )
    );
    return el;
  }

  // enables the editor for user1 and disables the other
  // Note: being in one DOM it doesn't work to have two
  // active editors at the same time
  switchUser(userId) {
    if (userId === 'user1') {
      this.refs.user1.extendProps({ disabled: false });
      this.refs.user2.extendProps({ disabled: true });
    } else if (userId === 'user2') {
      this.refs.user1.extendProps({ disabled: true });
      this.refs.user2.extendProps({ disabled: false });
    }
  }
}


window.onload = function() {
  App.mount({}, document.body);
};
