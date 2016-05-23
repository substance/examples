'use strict';

var $ = window.$ = require('substance/util/jquery');
var Component = require('substance/ui/Component');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var IsolatedNodesConfig = require('./IsolatedNodesConfig');

var AlienNode = require('./alien/AlienNode');
var EntityNode = require('./entity/EntityNode');
var InputNode = require('./input/InputNode');
var InlineEntityNode = require('./inline-entity/InlineEntityNode');

var example = require('substance/test/fixtures/collab/poem');
var doc = example.createArticle();
var schema = doc.getSchema();
schema.addNode(AlienNode);
schema.addNode(EntityNode);
schema.addNode(InputNode);
schema.addNode(InlineEntityNode);

var insertInlineNode = require('substance/model/transform/insertInlineNode');
var body = doc.get('body');

var a1 = doc.create({
  type: 'alien',
  id: 'alien1'
});
body.show(a1.id, 4);

// var a2 = doc.create({
//   type: 'alien',
//   id: 'alien2'
// });
// body.show(a2.id, 4);

var e1 = doc.create({
  type: 'entity',
  id: 'e1',
  name: 'Foo',
  description: 'Bar'
});
body.show(e1.id, 5);

var i1 = doc.create({
  type: 'input',
  id: 'i1',
  content: 'Lorem ipsum...'
});
body.show(i1.id, 2);

insertInlineNode(doc, {
  selection: doc.createSelection(['p1', 'content'], 28),
  node: {
    type: 'inline-entity',
    id : 'ie1',
    name: 'Bla',
    description: 'Blupp'
  }
});

function App() {
  App.super.apply(this, arguments);
}

App.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('app');

    var editor = $$(ProseEditor, {
      config: IsolatedNodesConfig,
      doc: this.props.doc
    });
    el.append(editor);
    return el;
  };
};

Component.extend(App);

$(function() {
  // For debugging in the console
  window.doc = doc;
  Component.mount(App, {
    doc: doc
  }, 'body');
});
