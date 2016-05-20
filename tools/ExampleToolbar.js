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

function ExampleToolbar() {
  Toolbar.apply(this, arguments);
}

ExampleToolbar.Prototype = function() {

  this.render = function($$) {
    var el = $$("div").addClass('sc-example-toolbar');
    var commandStates = this.props.commandStates;

    // TODO: Remove clone hack once #577 is fixed
    var tools = [
      $$(SwitchTextTypeTool, clone(commandStates['switch-text-type'])),
      $$(UndoTool, clone(commandStates.undo)).append($$(Icon, {icon: 'fa-undo'})),
      $$(RedoTool, clone(commandStates.redo)).append($$(Icon, {icon: 'fa-repeat'})),
      $$(StrongTool, clone(commandStates.strong)).append($$(Icon, {icon: 'fa-bold'})),
      $$(EmphasisTool, clone(commandStates.emphasis)).append($$(Icon, {icon: 'fa-italic'})),
      $$(LinkTool, clone(commandStates.link)).append($$(Icon, {icon: 'fa-link'}))
    ];

    el.append(
      $$(Toolbar.Group).append(
        tools
      )
    );
    return el;
  };
};

Toolbar.extend(ExampleToolbar);

module.exports = ExampleToolbar;
