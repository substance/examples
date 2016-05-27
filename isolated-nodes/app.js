'use strict';

var $ = window.$ = require('substance/util/jquery');
var Component = require('substance/ui/Component');
var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var IsolatedNodesConfig = require('./IsolatedNodesConfig');

var AlienComponent = require('./alien/AlienComponent');
var InsertAlienCommand = require('./alien/InsertAlienCommand');
var InsertAlienTool = require('./alien/InsertAlienTool');

var EntityComponent = require('./entity/EntityComponent');
var InsertEntityCommand = require('./entity/InsertEntityCommand');
var InsertEntityTool = require('./entity/InsertEntityTool');

var ContainerComponent = require('./container/ContainerComponent');
var InsertContainerCommand = require('./container/InsertContainerCommand');
var InsertContainerTool = require('./container/InsertContainerTool');

var InputComponent = require('./input/InputComponent');

var InlineEntityComponent = require('./inline-entity/InlineEntityComponent');

var fixture = require('./fixture');
var doc = fixture.createArticle();

var config = ProseEditor.static.mergeConfig(ProseEditor.static.config, {
  controller: {
    components: {
      'alien': AlienComponent,
      'entity': EntityComponent,
      'container': ContainerComponent,
      'input': InputComponent,
      'inline-entity': InlineEntityComponent
    }
  },
  bodyEditor: {
    commands: [
      InsertAlienCommand,
      InsertEntityCommand,
      InsertContainerCommand
    ]
  },
  tools: [
    InsertAlienTool,
    InsertEntityTool,
    InsertContainerTool
  ]
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
  Component.mount(App, { doc: doc }, 'body');
});
