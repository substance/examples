/*jshint latedef:nofunc */
'use strict';

// var poem = require('substance/test/fixtures/collab/poem');
var MessageQueue = require('substance/test/collab/MessageQueue');
var TestWebSocketServer = require('substance/test/collab/TestWebSocketServer');
var TestCollabSession = require('substance/test/collab/TestCollabSession');
var TestHubClient = require('substance/test/collab/TestHubClient');
var Icon = require('substance/ui/FontAwesomeIcon');
var TestCollabHub = require('substance/test/collab/TestCollabHub');
var TestStore = require('substance/test/collab/TestStore');
var TestWebSocket = require('substance/test/collab/TestWebSocket');

var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var Article = require('substance/packages/prose-editor/ProseArticle');
var $$ = Component.$$;

window.onload = function() {
  var debug = (window.location.hash === '#debug');
  window.app = TwoEditors.static.mount({
    debug: debug
  }, 'body');
};

function TwoEditors() {
  TwoEditors.super.apply(this, arguments);

  var fixture = require('substance/test/fixtures/collab/two-paragraphs');
  // var fixture = poem;

  // Two edited docs, one doc instance on the hub all with the same contents,
  // now we start synchronizing them.
  this.doc1 = new Article();
  this.doc2 = new Article();
  this.store = new TestStore({
    'test': fixture.createChangeset()
  });
  
  this.messageQueue = new MessageQueue();
  this.ws1 = new TestWebSocket(this.messageQueue, 'user1', 'hub');
  this.ws2 = new TestWebSocket(this.messageQueue, 'user2', 'hub');

  this.hubClient1 = new TestHubClient({
    ws: this.ws1,
    session: {
      sessionToken: 'user1token',
      user: {
        'id': 'user_1',
        'name': 'User 1'
      }
    }
  });

  this.hubClient2 = new TestHubClient({
    messageQueue: this.messageQueue,
    ws: this.ws2,
    session: {
      sessionToken: 'user2token',
      user: {
        'id': 'user_2',
        'name': 'User 2'
      }
    }
  });

  this.wss = new TestWebSocketServer(this.messageQueue, 'hub');

  console.log('wss', this.wss);

  this.hub = new TestCollabHub(this.wss, this.store);

  this.session1 = new TestCollabSession(this.doc1, {
    hubClient: this.hubClient1,
    docId: 'test',
    docVersion: 0
  });

  this.session2 = new TestCollabSession(this.doc2, {
    hubClient: this.hubClient1,
    docId: 'test',
    docVersion: 0
  });

  this._debug = this.props.debug;

  this.handleActions({
    'toggleDebug': this._toggleDebug,
    'processNextMessage': this._processNextMessage,
    'commit': this._onCommit
  });

  // let WebSocket react on message queue
  this.wss.connect();

  // Note: when we connect a client's socket,
  // the server will confirm the connection, which triggers
  // CollabSession._onConnected automatically, which then
  // start to talk the CollabHub prototocol
  // i.e., starting to send ['open', docId, version]
  this.ws1.connect();
  // also estabslish the connection for the second user
  this.ws2.connect();

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
      debug: this._debug
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

  this._toggleDebug = function() {
    if (!this._debug) {
      this.messageQueue.stop();
      this.session1.stop();
      this.session2.stop();
    } else {
      this.messageQueue.start();
      this.session1.start();
      this.session2.start();
    }
    this._debug = !this._debug;
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
    this.props.messageQueue.disconnect(this);
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
            .append($$(Icon, {icon: 'fa-toggle-off'}), ' Network')
            .on('click', this._toggleDebug)
        )
      );
    } else {
      statusEl.append(
        $$('div').addClass('se-left').append(
          this.props.messageQueue.messages.length+' messages in the air '
        ),
        $$('div').addClass('se-right').append(
          $$('button').addClass('se-debug')
            .append($$(Icon, {icon: 'fa-toggle-on'}), ' Network')
            .on('click', this._toggleDebug)
        )
      );
    }
    return statusEl;
  };

  this._onMessagesUpdated = function(/*messages*/) {
    this.rerender();
  };

  this._toggleDebug = function() {
    this.send('toggleDebug');
  };

  this._processNextMessage = function() {
    this.send('processNextMessage');
  };

  this._dumpMessageQueue = function() {
    // console.log(this.props.messageQueue.messages);
    console.log(JSON.stringify(this.props.messageQueue.messages, null, 2));
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
