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
    'processNextMessage': this._processNextMessage
  });

  // CollabSession expects a connected and authenticated collabClient
  this.session1 = new TestCollabSession(this.doc1, {
    collabClient: this.collabClient1,
    documentId: 'test-doc',
    version: 1,
    logging: true,
    autoSync: true
  });
  // For debugging
  this.session1.__NAME = 'session1';
  
  this.session2 = new TestCollabSession(this.doc2, {
    collabClient: this.collabClient2,
    documentId: 'test-doc',
    version: 1,
    logging: true,
    autoSync: true
  });
  // For debugging
  this.session2.__NAME = 'session2';

  if (this._debug) {
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

    leftEditor.outlet('tools').append(
      $$(SessionDumpTool, { session: this.session1 }),
      $$(ToggleConnectionTool, { session: this.session1 })
    );

    rightEditor.outlet('tools').append(
      $$(SessionDumpTool, { session: this.session2 }),
      $$(ToggleConnectionTool, { session: this.session2 })
    );

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

  this._processNextMessage = function() {
    this.messageQueue.tick();
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
            .append($$(Icon, {
              icon: 'fa-step-forward'
            }))
            .on('click', this._processNextMessage),
          $$('button').addClass('se-dump-messages')
            .append($$(Icon, {icon: 'fa-tasks'}))
            .attr({ title: 'Dump MessageQueue'})
            .on('click', this._dumpMessageQueue)
        )
      );
    } else {
      statusEl.append(
        $$('div').addClass('se-left').append(
          this.props.messageQueue.messages.length+' messages in the air '
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

Component.extend(Status);

function SessionDumpTool() {
  SessionDumpTool.super.apply(this, arguments);
}

SessionDumpTool.Prototype = function() {

  this.render = function() {
    var el = $$('div')
      .attr('title', 'Dump Session message log')
      .addClass('se-tool')
      .append(
        $$('button')
          .append($$(Icon, {icon: 'fa-tasks'}))
          .on('click', this.onClick)
      );
    return el;
  };

  this.onClick = function() {
    console.log(this.props.session.dumpIncomingMessages());
  };
};

Component.extend(SessionDumpTool);


function ToggleConnectionTool() {
  ToggleConnectionTool.super.apply(this, arguments);
}

ToggleConnectionTool.Prototype = function() {

  this.didMount = function() {
    this.session = this.props.session;
    this.session.on('connected', this._onConnected, this);
    this.session.on('disconnected', this._onDisconnected, this);
  };

  this._onConnected = function() {
    this.setState({
      connected: true
    });
  };

  this._onDisconnected = function() {
    this.setState({
      connected: false
    });
  };

  this.dispose = function() {
    this.session.off(this);
  };

  this.getInitialState = function() {
    return {
      connected: true
    };
  };

  this.render = function() {
    var el = $$('div')
      .attr('title', this.state.connected ? 'Disconnect': 'Connect (aka sync)')
      .addClass('se-tool')
      .append(
        $$('button').addClass('se-debug')
          .append($$(Icon, {
            icon: this.state.connected ? 'fa-toggle-on' : 'fa-toggle-off'
          }), ' Connected')
          .on('click', this.onClick)
      );
    return el;
  };

  this.onClick = function() {
    var connected = this.state.connected;
    if (connected) {
      this.props.session.disconnect();
    } else {
      this.props.session.sync();
    }
  };
};

Component.extend(ToggleConnectionTool);
