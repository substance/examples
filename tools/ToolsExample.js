'use strict';

var Controller = require('substance/ui/Controller');
var ContainerEditor = require('substance/ui/ContainerEditor');
var SplitPane = require('substance/ui/SplitPane');
var ScrollPane = require('substance/ui/ScrollPane');
var Toolbar = require('substance/ui/Toolbar');
var ExampleToolbar = require('./ExampleToolbar');

function ToolsExample() {
  ToolsExample.super.apply(this, arguments);
}

ToolsExample.Prototype = function() {

  this.render = function($$) {
    var config = this.getConfig();

    return $$('div').addClass('sc-editor').append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        $$(Toolbar, {
          content: ExampleToolbar
        }),
        $$(ScrollPane, {
          overlay: config.surfaces.body.overlay,
        }).append(
          $$(ContainerEditor, {
            documentSession: this.documentSession,
            containerId: 'body',
            name: 'body',
            commands: config.surfaces.body.commands,
            textTypes: config.surfaces.body.textTypes
          }).ref('body')
        ).ref('contentPanel')
      )
    );
  };
};

Controller.extend(ToolsExample);

ToolsExample.static.config = {
  components: {
    'paragraph': require('substance/packages/paragraph/ParagraphComponent'),
    'heading': require('substance/packages/heading/HeadingComponent'),
    'link': require('substance/packages/link/LinkComponent'),
    'codeblock': require('substance/packages/codeblock/CodeblockComponent'),
    'blockquote': require('substance/packages/blockquote/BlockquoteComponent')
  },
  commands: [
    // ControllerCommands
    require('substance/ui/UndoCommand'),
    require('substance/ui/RedoCommand'),
    require('substance/ui/SaveCommand'),

    // SurfaceCommands
    require('substance/packages/text/SwitchTextTypeCommand'),
    require('substance/packages/strong/StrongCommand'),
    require('substance/packages/emphasis/EmphasisCommand'),
    require('substance/packages/link/LinkCommand'),
  ],
  surfaces: {
    body: {
      overlay: require('./BodyTools'),
      commands: ['switch-text-type', 'strong', 'emphasis', 'link'],
      textTypes: [
        {name: 'paragraph', data: {type: 'paragraph'}},
        {name: 'heading1',  data: {type: 'heading', level: 1}},
        {name: 'heading2',  data: {type: 'heading', level: 2}},
        {name: 'heading3',  data: {type: 'heading', level: 3}},
        {name: 'codeblock', data: {type: 'codeblock'}},
        {name: 'blockquote', data: {type: 'blockquote'}}
      ]      
    }
  }
};

module.exports = ToolsExample;
