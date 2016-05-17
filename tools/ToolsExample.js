'use strict';

var Controller = require('substance/ui/Controller');
var ContainerEditor = require('substance/ui/ContainerEditor');
var SplitPane = require('substance/ui/SplitPane');
var ScrollPane = require('substance/ui/ScrollPane');
var DynamicToolbar = require('./DynamicToolbar');
var OverlayTools = require('./OverlayTools');

function ToolsExample() {
  ToolsExample.super.apply(this, arguments);
}

ToolsExample.Prototype = function() {

  this.render = function($$) {
    var config = this.getConfig();

    return $$('div').addClass('sc-editor').append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        $$(DynamicToolbar, {
          toolState: this.toolManager.toolState
        }),
        $$(ScrollPane, {
          scrollbarType: 'substance',
          scrollbarPosition: 'right'
        }).append(
          $$(ContainerEditor, {
            documentSession: this.documentSession,
            containerId: 'body',
            name: 'body',
            overlay: [
              $$(OverlayTools, {
                toolState: this.toolManager.toolState
              })            
            ],
            commands: config.surfaces.body.commands,
            textTypes: config.surfaces.body.textTypes
          }).ref('body')
            /*
            TODO: this produces an error, inspect
            .outlet('overlay').append(
            // $$(OverlayTools, {
            //   toolState: this.toolManager.toolState
            // })
            )*/
        ).ref('contentPanel')
      )
    );
  };
};

Controller.extend(ToolsExample);

ToolsExample.static.config = {
  controller: {
    components: {
      'paragraph': require('substance/packages/paragraph/ParagraphComponent'),
      'heading': require('substance/packages/heading/HeadingComponent'),
      'link': require('substance/packages/link/LinkComponent'),
      'codeblock': require('substance/packages/codeblock/CodeblockComponent'),
      'blockquote': require('substance/packages/blockquote/BlockquoteComponent')
    },
    commands: [
      require('substance/ui/UndoCommand'),
      require('substance/ui/RedoCommand'),
      require('substance/ui/SaveCommand')
    ]
  },
  surfaces: {
    body: {
      commands: [
        require('substance/packages/text/SwitchTextTypeCommand'),
        require('substance/packages/strong/StrongCommand'),
        require('substance/packages/emphasis/EmphasisCommand'),
        require('substance/packages/link/LinkCommand'),
      ],
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
