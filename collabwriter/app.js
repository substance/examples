/*jshint latedef:nofunc */
'use strict';

var MessageQueue = require('substance/test/collab/MessageQueue');
var TestWebSocketServer = require('substance/test/collab/TestWebSocketServer');
var TestCollabSession = require('substance/test/collab/TestCollabSession');
var CollabClient = require('substance/collab/CollabClient');
var TestWebSocketConnection = require('substance/test/collab/TestWebSocketConnection');

var Icon = require('substance/ui/FontAwesomeIcon');
var twoParagraphs = require('substance/test/fixtures/collab/two-paragraphs');
var TestCollabServer = require('substance/test/collab/TestCollabServer');

var DocumentStore = require('substance/collab/DocumentStore');
var ChangeStore = require('substance/collab/ChangeStore');
var documentStoreSeed = require('substance/test/fixtures/collab/documentStoreSeed');
var changeStoreSeed = require('substance/test/fixtures/collab/changeStoreSeed');
var DocumentEngine = require('substance/collab/DocumentEngine');

var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');

var $$ = Component.$$;

window.onload = function() {
  var debug = (window.location.hash === '#debug');
  window.app = TwoEditors.static.mount({
    debug: debug
  }, 'body');
};

function TwoEditors() {
  TwoEditors.super.apply(this, arguments);

  // Two edited docs, one doc instance on the hub all with the same contents,
  // now we start synchronizing them.
  this.doc1 = twoParagraphs.createArticle();
  this.doc2 = twoParagraphs.createArticle();

  this.documentStore = new DocumentStore().seed(documentStoreSeed);
  this.changeStore = new ChangeStore().seed(changeStoreSeed);

  this.documentEngine = new DocumentEngine({
    documentStore: this.documentStore,
    changeStore: this.changeStore,
    schemas: {
      'prose-article': {
        name: 'prose-article',
        version: '1.0.0',
        documentFactory: twoParagraphs
      }
    }
  });

  this.messageQueue = new MessageQueue();

  this.wss = new TestWebSocketServer({
    messageQueue: this.messageQueue,
    serverId: 'hub'
  });

  console.log('wss', this.wss);

  this.collabServer = new TestCollabServer({
    documentEngine: this.documentEngine
  });

  // Connect the collabServer
  this.collabServer.bind(this.wss);

  // Once the server we can open connections
  this.conn1 = new TestWebSocketConnection({
    messageQueue: this.messageQueue,
    clientId: 'user1',
    serverId: 'hub'
  });

  this.conn2 = new TestWebSocketConnection({
    messageQueue: this.messageQueue,
    clientId: 'user2',
    serverId: 'hub'
  });

  this.collabClient1 = new CollabClient({
    connection: this.conn1
  });

  this.collabClient2 = new CollabClient({
    connection: this.conn2
  });

  this._debug = this.props.debug;

  this.handleActions({
    'toggleNetwork': this._toggleNetwork,
    'processNextMessage': this._processNextMessage,
    'commit': this._onCommit
  });

  // CollabSession expects a connected and authenticated ws (available via hubClient)
  this.session1 = new TestCollabSession(this.doc1, {
    collabClient: this.collabClient1,
    docId: 'test-doc',
    docVersion: 1
  });
  // For debugging
  this.session1.__NAME = 'session1';
  
  this.session2 = new TestCollabSession(this.doc2, {
    collabClient: this.collabClient2,
    docId: 'test-doc',
    docVersion: 1
  });
  // For debugging
  this.session2.__NAME = 'session2';


  if (this._debug) {
    this.session1.stop();
    this.session2.stop();
    // flush initial handshake messages
    this.messageQueue.flush();
  } else {
    this.messageQueue.flush();
    this.messageQueue.start();
  }
}

TwoEditors.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('sc-two-editors');
    var statusEl = $$(Status, {
      messageQueue: this.messageQueue,
      debug: this._debug,
      disabledNetwork: this._disabledNetwork
    }).ref('statusEl').ref('status');

    var leftEditor = $$(ProseEditor, {
      documentSession: this.session1
    }).ref('left').addClass('left-editor');

    var rightEditor = $$(ProseEditor, {
      documentSession: this.session2
    }).ref('right').addClass('right-editor');

    if (this._debug) {
      leftEditor.outlet('tools').append(
        $$(CommitTool, { session: this.session1 })
      );
      rightEditor.outlet('tools').append(
        $$(CommitTool, { session: this.session2 })
      );
    }

    el.append(
      $$(SplitPane, {splitType: 'horizontal', sizeB: 'inherit'}).append(
        $$(SplitPane, {
          splitType: 'vertical',
          sizeA: '50%'
        }).append(
          leftEditor,
          rightEditor
        ),
        statusEl
      )
    );
    return el;
  };

  // We just disconnect collaborator 1
  this._toggleNetwork = function() {
    if (!this._disabledNetwork) {
      this.conn1.disconnect();
    } else {
      this.conn1.connect();
    }
    this._disabledNetwork = !this._disabledNetwork;
    this.rerender();
  };

  this._processNextMessage = function() {
    this.messageQueue.tick();
  };

  this._onCommit = function(evt) {
    console.log('Commit');
    evt.stopPropagation();
  };

};

Component.extend(TwoEditors);

function Status() {
  Status.super.apply(this, arguments);
}

Status.Prototype = function() {

  this.didMount = function() {
    this.props.messageQueue.on('messages:updated', this._onMessagesUpdated, this);
  };

  this.dispose = function() {
    this.props.messageQueue.off(this);
  };

  this.render = function() {
    var statusEl = $$('div').addClass('se-status');

    if (this.props.debug) {
      statusEl.append(
        $$('div').addClass('se-left').append(
          this.props.messageQueue.messages.length+' messages in the air ',
          $$('button').addClass('se-next-message')
            .append($$(Icon, {icon: 'fa-step-forward'})).on('click', this._processNextMessage),
          $$('button').addClass('se-dump-messages')
            .append($$(Icon, {icon: 'fa-tasks'}))
            .attr({ title: 'Dump MessageQueue'})
            .on('click', this._dumpMessageQueue)
        ),
        $$('div').addClass('se-right').append(
          $$('button').addClass('se-debug')
            .append($$(Icon, {icon: this.props.disabledNetwork ? 'fa-toggle-off' : 'fa-toggle-on'}), ' Network')
            .on('click', this._toggleNetwork)
        )
      );
    } else {
      statusEl.append(
        $$('div').addClass('se-left').append(
          this.props.messageQueue.messages.length+' messages in the air '
        ),
        $$('div').addClass('se-right').append(
          $$('button').addClass('se-debug')
            .append($$(Icon, {icon: this.props.disabledNetwork ? 'fa-toggle-off' : 'fa-toggle-on'}), ' Network')
            .on('click', this._toggleNetwork)
        )
      );
    }
    return statusEl;
  };

  this._onMessagesUpdated = function(/*messages*/) {
    this.rerender();
  };

  this._toggleNetwork = function() {
    this.send('toggleNetwork');
  };

  this._processNextMessage = function() {
    this.send('processNextMessage');
  };

  this._dumpMessageQueue = function() {
    console.log(JSON.stringify(this.props.messageQueue._log, null, 2));
  };
};

function CommitTool() {
  CommitTool.super.apply(this, arguments);
}

CommitTool.Prototype = function() {

  this.didMount = function() {
    this.doc = this.props.session.getDocument();
    this.doc.on('document:changed',
      this.afterDocumentChange, this, { priority: -10 });
  };

  this.dispose = function() {
    this.doc.off(this);
  };

  this.render = function() {
    var el = $$('div')
      .attr('title', 'Commit')
      .addClass('se-tool')
      .append(
        $$('button')
          .append($$(Icon, {icon: 'fa-send'}))
          .on('click', this.onClick)
      );
    if (this.state.disabled) {
      el.addClass('sm-disabled');
    }
    return el;
  };

  this.getInitialState = function() {
    return {
      disabled: !this.props.session.nextCommit
    };
  };

  this.afterDocumentChange = function() {
    var newState = {};
    newState.visible = !!this.props._runner;
    newState.disabled = !this.props.session.nextCommit;
    this.setState(newState);
  };

  this.onClick = function() {
    this.props.session.commit();
    this.afterDocumentChange();
  };

};

Component.extend(CommitTool);

Component.extend(Status);
