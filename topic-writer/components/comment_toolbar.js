'use strict';

var Component = require('substance/ui/component');
var $$ = Component.$$;
var Icon = require('substance/ui/font_awesome_icon');

var UndoTool = require('substance/ui/tools/undo_tool');
var RedoTool = require('substance/ui/tools/redo_tool');
var StrongTool = require('substance/ui/tools/strong_tool');
var EmphasisTool = require('substance/ui/tools/emphasis_tool');
var LinkTool = require('substance/ui/tools/link_tool');

var Toolbar = Component.extend({
  displayName: "NotepadToolbar",
  render: function() {
    var el = $$('div').addClass('toolbar');
    el.append(
      $$(UndoTool).append($$(Icon, {icon: 'fa-undo'})),
      $$(RedoTool).append($$(Icon, {icon: 'fa-repeat'})),
      $$(StrongTool).append($$(Icon, {icon: 'fa-bold'})),
      $$(EmphasisTool).append($$(Icon, {icon: 'fa-italic'})),
      $$(LinkTool).append($$(Icon, {icon: 'fa-link'}))
    );
    return el;
  }
});

module.exports = Toolbar;