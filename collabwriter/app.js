'use strict';

var exampleDoc = require('../simple/exampleDoc');
var MessageQueue = require('substance/util/MessageQueue');
var WebSocketServer = require('substance/util/WebSocketServer');
var CollabSession = require('substance/model/CollabSession');
var Icon = require('substance/ui/FontAwesomeIcon');
var StubHub = require('substance/util/StubHub');
var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');
var Editor = require('../simple/Editor');
var $$ = Component.$$;

var Status = function() {
  Status.super.apply(this, arguments);

  this.props.messageQueue.connect(this, {
    'messages:updated': this._onMessagesUpdated
  });
};

Status.Prototype = function() {
  this._onMessagesUpdated = function(/*messages*/) {
    this.rerender();
  };

  this._toggleDebug = function() {
    this.send('toggleDebug');
  };

  this._processNextMessage = function() {
    this.send('processNextMessage');
  };

  this.render = function() {
    var statusEl = $$('div').addClass('se-status');

    if (this.props.debug) {
      statusEl.append(
        $$('div').addClass('se-left').append(
          this.props.messageQueue.messages.length+' messages in the air ',
          $$('a').attr({href: '#'}).addClass('se-next-message').append($$(Icon, {icon: 'fa-step-forward'})).on('click', this._processNextMessage)
        ),
        $$('div').addClass('se-right').append(
          $$('a').attr({href: '#'}).addClass('se-debug').append($$(Icon, {icon: 'fa-toggle-off'}), ' Network').on('click', this._toggleDebug)
        )
      );
    } else {
      statusEl.append(
        $$('div').addClass('se-left').append(
          this.props.messageQueue.messages.length+' messages in the air '
        ),
        $$('div').addClass('se-right').append(
          $$('a').attr({href: '#'}).addClass('se-debug').append($$(Icon, {icon: 'fa-toggle-on'}), ' Network').on('click', this._toggleDebug)
        )
      );
    }
    return statusEl;
  };
};

Component.extend(Status);


function TwoEditors() {
  TwoEditors.super.apply(this, arguments);

  this.messageQueue = new MessageQueue();
  this.messageQueue.start();

  // Two edited docs, one doc instance on the hub all with the same contents,
  // now we start synchronizing them.
  this.doc1 = exampleDoc();
  this.doc2 = exampleDoc();
  this.hubDoc = exampleDoc();
  
  this.wss = new WebSocketServer(this.messageQueue);
  this.hub = new StubHub(this.hubDoc, this.wss);

  // Create two CollabSessions for the same doc
  this.session1 = new CollabSession(this.doc1, {messageQueue: this.messageQueue});
  this.session2 = new CollabSession(this.doc2, {messageQueue: this.messageQueue});

  this.handleActions({
    'toggleDebug': this._toggleDebug,
    'processNextMessage': this._processNextMessage
  });
}


TwoEditors.Prototype = function() {

  this._toggleDebug = function() {
    if (!this._debug) {
      this.messageQueue.stop();
    } else {
      this.messageQueue.start();
    }
    this._debug = !this._debug;
    this.refs.status.extendProps({
      debug: this._debug
    });
  };

  this._processNextMessage = function() {
    this.messageQueue.tick();
  };

  this.getInitialState = function() {
    return {
      debug: false
    };
  };

  this.render = function() {
    var el = $$('div').addClass('sc-two-editors');
    var statusEl = $$(Status, {
      messageQueue: this.messageQueue,
      debug: false
    }).ref('statusEl').ref('status');

    el.append(
      $$(SplitPane, {splitType: 'horizontal', sizeB: 'inherit'}).append(
        $$(SplitPane, {
            splitType: 'vertical',
            sizeA: '50%'
          }).append(
          $$(Editor, {documentSession: this.session1}).ref('left').addClass('left-editor'),
          $$(Editor, {documentSession: this.session2}).ref('right').addClass('right-editor')
        ),
        statusEl

      )
    );
    return el;
  };
};

Component.extend(TwoEditors);

window.onload = function() {
  window.app = TwoEditors.static.mount({}, 'body');
};
