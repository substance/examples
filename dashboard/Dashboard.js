'use strict';

var each = require('lodash/each');
var Component = require('substance/ui/Component');
var CollabClient = require('substance/test/collab/TestCollabClient');
var Facette = require('./Facette');
var FacetteCollabSession = require('./FacetteCollabSession');
var EditableDashboardEntry = require('./EditableDashboardEntry');

var $$ = Component.$$;

function Dashboard() {
  Dashboard.super.apply(this, arguments);

  this._sessions = {};
  this._collabClient = null;

  this._initCollabClient(this.props);
  this._initializeSessions(this.props);
}

Dashboard.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this._initCollabClient = function(props) {
    var ws = props.ws;
    var collabClient = new CollabClient({
      ws: ws
    });
    // TODO: need to reconcile the CollabClient implementation
    // so that it works also with an already connected websocket
    if (ws.readyState !== 1) {
      this.props.ws.connect();
    }
    this._collabClient = collabClient;
  };

  this._initializeSessions = function(props) {
    if (!props.entries) return;
    var sessions = this._sessions;
    // TODO: ATM sessions are not cleaned up
    props.entries.forEach(function(entry) {
      // don't create a new session if already exists
      if (sessions[entry.id]) return;
      var doc = new Facette({
        meta: {
          title: entry.title,
          abstract: entry.abstract
        }
      });
      var session = new FacetteCollabSession(doc, {
        collabClient: this._collabClient,
        docId: entry.id,
        docVersion: entry.version,
      });
      sessions[entry.id] = session;
    }.bind(this));

  };

  this.willReceiveProps = function(newProps) {
    // this._initCollabSession(newProps);
    this._initializeSessions(newProps);
  };

  this.dispose = function() {
    _super.dispose.call(this);
    each(this._sessions, function(session) {
      session.disconnect();
    });
  };

  this.render = function() {
    var el = $$('div').addClass('sc-dashboard');

    var entries = this.props.entries;
    if (!entries || entries.length === 0) {
      el.append($$('div').append('No documents'));
    } else {
      var content = $$('div').addClass('se-entries');
      entries.forEach(function(entry) {
        content.append(this.renderEntry(entry));
      }.bind(this));
      el.append(content);
    }
    return el;
  };

  this.renderEntry = function(entry) {
    var session = this._sessions[entry.id];
    return $$(EditableDashboardEntry, {
      documentSession: session,
      documentId: entry.id
    });
  };
};

Component.extend(Dashboard);

module.exports = Dashboard;
