'use strict';

var Toolbar = require('substance/ui/Toolbar');
var UndoTool = require('substance/ui/UndoTool');
var RedoTool = require('substance/ui/RedoTool');
var Icon = require('substance/ui/FontAwesomeIcon');
var SwitchTextTypeTool = require('substance/packages/text/SwitchTextTypeTool');
var StrongTool = require('substance/packages/strong/StrongTool');
var EmphasisTool = require('substance/packages/emphasis/EmphasisTool');
// var LinkTool = require('substance/packages/link/LinkTool');

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
    var el = $$("div").addClass("sc-toolbar");
    var toolState = this.props.toolState;

    if (!toolState) return el;

    var tools = [
      $$(SwitchTextTypeTool, toolState['switch-text-type']),
      $$(UndoTool, toolState.undo).append($$(Icon, {icon: 'fa-undo'})),
      $$(RedoTool, toolState.redo).append($$(Icon, {icon: 'fa-repeat'})),
      $$(StrongTool, toolState.strong).append($$(Icon, {icon: 'fa-bold'})),
      $$(EmphasisTool, toolState.emphasis).append($$(Icon, {icon: 'fa-italic'}))
    ];

    // if (toolState['link'].context === 'edit') {
    // }

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
