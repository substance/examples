/*jshint latedef:nofunc */
'use strict';

var each = require('lodash/each');
var createDocumentFactory = require('substance/model/createDocumentFactory');
var JSONConverter = require('substance/model/JSONConverter');
var DocumentChange = require('substance/model/DocumentChange');

var DocumentStore = require('substance/collab/DocumentStore');
var ChangeStore = require('substance/collab/ChangeStore');
var DocumentEngine = require('substance/collab/DocumentEngine');

var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');

var WebSocketSimulation = require('substance/test/collab/WebSocketSimulation');
var CollabServer = require('substance/test/collab/TestCollabServer');
var CollabClient = require('substance/test/collab/TestCollabClient');
var CollabSession = require('substance/test/collab/TestCollabSession');

var Article = require('./Article');
var ArticleEditor = require('./ArticleEditor');
var Dashboard = require('./Dashboard');

var $$ = Component.$$;

var documentFactory = createDocumentFactory(Article, function(doc) {
  doc.create({
    id: 'p1',
    type: 'paragraph',
    content: 'Enter text here.'
  });
  doc.get('body').show('p1');
});

var docStoreSeed = {
  'article-1': {
    documentId: 'article-1',
    schemaName: 'article',
    schemaVersion: '1.0.0',
    version: 0
  },
  'article-2': {
    documentId: 'article-2',
    schemaName: 'article',
    schemaVersion: '1.0.0',
    version: 0
  }
};

var jsonConverter = new JSONConverter();
var article1 = documentFactory.createArticle();
article1.set(['meta', 'title'], 'Foo');
article1.set(['meta', 'abstract'], 'Bar');
article1.id = 'article-1';
article1.version = 1;
var article2 = documentFactory.createArticle();
article2.set(['meta', 'title'], 'Bla');
article2.set(['meta', 'abstract'], 'Blupp');
article2.id = 'article-2';
article2.version = 1;

var wsSim = new WebSocketSimulation();

function App() {
  App.super.apply(this, arguments);

  // TODO: use SnapshotStore when it is implemented
  this.snapshotStore = new SnapshotStore({
    'article-1': article1,
    'article-2': article2
  });
  this.changeStore = new ChangeStore().seed({
    'article-1': [null],
    'article-2': [null],
  });
  this.documentStore = new DocumentStore().seed(docStoreSeed);

  this.documentEngine = new DocumentEngine({
    documentStore: this.documentStore,
    changeStore: this.changeStore,
    snapshotStore: this.snapshotStore,
    schemas: {
      'article': {
        name: 'article',
        version: '1.0.0',
        documentFactory: documentFactory
      }
    }
  });

  this.wss = wsSim.getServerSocket();
  this.collabServer = new CollabServer({
    documentEngine: this.documentEngine
  });
  this.collabServer.bind(this.wss);

  this.ws1 = wsSim.createClientSocket('user1');
  this.ws2 = wsSim.createClientSocket('user2');

  // starts message delivery
  wsSim.start();

  this.handleActions({
    openEditor: this.openEditor
  });
}

App.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('sc-app');

    var leftPanel = $$('div').addClass('se-left-panel').ref('left');
    var leftPanelContent = $$(Dashboard, {
        ws: this.ws1,
        entries: this._listDocuments()
      }).ref('leftContent');
    leftPanel.append(
      $$(SplitPane, {splitType: 'horizontal'}).ref('leftSplitPane').append(
         $$('h1').append('Dashboard').addClass('se-panel-title'),
         leftPanelContent
      )
    );

    var rightPanel = $$('div').ref('right').addClass('se-right-panel');
    var rightPanelContent = $$('div').addClass('se-right-panel').ref('rightContent');
    if (this._editingSession) {
      rightPanelContent = $$(ArticleEditor, {
        documentId: this._documentId,
        documentSession: this._editingSession,
        doc: this._editingSession.getDocument()
      }).ref('editor');
    } else {
      rightPanelContent = $$('div').append('No document.');
    }
    rightPanel.append(
      $$(SplitPane, {splitType: 'horizontal'}).ref('rightSplitPane').append(
         $$('h1').addClass('se-panel-title').append('Editor'),
         rightPanelContent
      )
    );

    el.append(
      $$(SplitPane, {
        splitType: 'vertical',
        sizeA: '50%'
      }).ref('leftRightSplit').append(
        leftPanel,
        rightPanel
      )
    );
    return el;
  };

  this.openEditor = function(documentId) {
    var doc = documentFactory.createEmptyArticle();
    var json = this._getSnapshot(documentId);
    jsonConverter.importDocument(doc, json);
    var version = json.version;
    var ws = this.ws2;
    if (this._editingSession) {
      this._editingSession.dispose();
      ws.disconnect();
    }
    var collabClient = new CollabClient({
      ws: ws
    });
    var session = new CollabSession(doc, {
      collabClient: collabClient,
      docId: documentId,
      docVersion: version,
    });
    if (ws.readyState !== 1) {
      ws.connect();
    }
    this._documentId = documentId;
    this._editingSession = session;
    this.rerender();
  };

  this._getSnapshot = function(documentId) {
    var doc = this.snapshotStore._docs[documentId];
    var json = jsonConverter.exportDocument(doc);
    json.id = doc.id;
    json.version = doc.version;
    return json;
  };

  this._listDocuments = function() {
    var entries = [];
    // collect informations from snapshots
    each(this.documentStore._documents, function(record, id) {
      var entry = this._getArticleMeta(id);
      entry.id = id;
      entries.push(entry);
    }.bind(this));
    return entries;
  };

  this._getArticleMeta = function(documentId) {
    var doc = this.snapshotStore.getDocument(documentId);
    var meta = doc.get('meta');
    return {
      title: meta.title,
      abstract: meta.abstract,
      version: doc.version
    };
  };

};

Component.extend(App);

function SnapshotStore(seed) {
  this._docs = seed;

  this.getDocument = function(documentId) {
    return this._docs[documentId];
  };

  this.update = function(args, cb) {
    var docId = args.documentId;
    var version = args.version;
    var change = DocumentChange.fromJSON(args.change);
    var doc = this._docs[docId];
    doc._apply(change);
    doc.version = version;
    cb();
  };
}

window.onload = function() {
  window.app = App.static.mount({}, 'body');
};
