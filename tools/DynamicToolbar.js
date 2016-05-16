'use strict';

var Toolbar = require('substance/ui/Toolbar');
var Icon = require('substance/ui/FontAwesomeIcon');
var clone = require('lodash/lang/clone');
var UndoTool = require('substance/ui/UndoTool');
var RedoTool = require('substance/ui/RedoTool');

var SwitchTextTypeTool = require('substance/packages/text/SwitchTextTypeTool');
var StrongTool = require('substance/packages/strong/StrongTool');
var EmphasisTool = require('substance/packages/emphasis/EmphasisTool');
var LinkTool = require('substance/packages/link/LinkTool');
var EditLinkTool = require('substance/packages/link/EditLinkTool');

function DynamicToolbar() {
  Toolbar.apply(this, arguments);
}

DynamicToolbar.Prototype = function() {
  this.didMount = function() {
    this.context.toolManager.registerComponent(this);
  };

  this.dispose = function() {
    this.context.toolManager.unregisterComponent(this);
  };

  this.render = function($$) {
    var el = $$("div").addClass('sc-toolbar');
    var toolState = this.props.toolState;

    console.log('current toolState', toolState);
    if (!toolState || Object.keys(toolState).length === 0) {
      console.warn('toolState not ready yet');
      return el;
    }

    // TODO: Remove clone hack once 
    var tools = [
      $$(SwitchTextTypeTool, clone(toolState['switch-text-type'])),
      $$(UndoTool, clone(toolState.undo)).append($$(Icon, {icon: 'fa-undo'})),
      $$(RedoTool, clone(toolState.redo)).append($$(Icon, {icon: 'fa-repeat'})),
      $$(StrongTool, clone(toolState.strong)).append($$(Icon, {icon: 'fa-bold'})),
      $$(EmphasisTool, clone(toolState.emphasis)).append($$(Icon, {icon: 'fa-italic'})),
      $$(LinkTool, clone(toolState.link)).append($$(Icon, {icon: 'fa-link'}))
    ];

    // TODO: Activate link url editing
    if (toolState['link'].mode === 'edit') {
      tools.push(
        $$(EditLinkTool, clone(toolState.link))
      );
    }

    el.append(
      $$(Toolbar.Group).append(
        tools
      )
    );
    return el;
  };
};

Toolbar.extend(DynamicToolbar);

module.exports = DynamicToolbar;
