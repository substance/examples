'use strict';

var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var CollabClient = require('substance/collab/CollabClient');
var TestCollabSession = require('substance/test/collab/TestCollabSession');
var twoParagraphs = require('substance/test/fixtures/twoParagraphs');
var createTestArticle = require('substance/test/fixtures/createTestArticle');
var Surface = require('substance/ui/Surface');
var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var Configurator = require('substance/util/Configurator');
var configurator = new Configurator(ProseEditorPackage);

// this flag prevents competing updates of DOM selections
// which is only necessary in this example, where we host two
// clients in one DOM
Surface.MULTIPLE_APPS_ON_PAGE = true;

function Client() {
  Client.super.apply(this, arguments);

  this.doc = createTestArticle(twoParagraphs);

  if (!this.props.connection) {
    throw new Error("'connection' is required.");
  }

  this.collabClient = new CollabClient({
    connection: this.props.connection
  });

  this.doc = createTestArticle(twoParagraphs);

  // CollabSession expects a connected and authenticated collabClient
  this.session = new TestCollabSession(this.doc, {
    collabClient: this.collabClient,
    documentId: 'test-doc',
    version: 1,
    logging: true,
    autoSync: true
  });

}

Client.Prototype = function() {

  this.didMount = function() {
    this.refs.editor.refs.body.selectFirst();
  };

  this.render = function($$) {
    var el = $$('div').addClass('sc-client').addClass('sm-'+this.props.userId);

    var editor = $$(ProseEditor, {
      disabled: this.props.disabled,
      documentSession: this.session,
      configurator: configurator,
    }).ref('editor');

    editor.outlet('tools').append(
      $$(SessionDumpTool, { session: this.session }),
      $$(ToggleConnectionTool, { session: this.session })
    );

    if (this.props.disabled) {
      el.append(
        $$('div').addClass('se-blocker')
          .on('mousedown', this.onMousedown)
      );
    }

    el.append(editor);

    return el;
  };

  this.onMousedown = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.send('switchUser', this.props.userId);
  };

};

Component.extend(Client);

function SessionDumpTool() {
  SessionDumpTool.super.apply(this, arguments);
}

SessionDumpTool.Prototype = function() {

  this.render = function($$) {
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

  this.render = function($$) {
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

module.exports = Client;