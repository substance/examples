"use strict";

var Component = require('substance/ui/component');
var $$ = Component.$$;
var ToolComponent = require('substance/ui/tools/tool_component');
var LinkToolComponent = require('substance/ui/tools/link_tool_component');
var Icon = require('substance/ui/font_awesome_icon');

var Toolbar = Component.extend({
  render: function() {
    return $$('div').addClass('toolbar').append([
      $$(ToolComponent, {tool: 'undo', 'title': 'Undo'}).append($$(Icon, {icon: 'fa-undo'})),
      $$(ToolComponent, {tool: 'redo', 'title': 'Redo'}).append($$(Icon, {icon: 'fa-repeat'})),
      $$(ToolComponent, {tool: 'emphasis', 'title': 'Emphasis'}).append($$(Icon, {icon: 'fa-italic'})),
      $$(ToolComponent, {tool: 'strong', title: 'Strong'}).append($$(Icon, {icon: 'fa-bold'})),
      $$(ToolComponent, {tool: 'mark', 'title': 'Mark'}).append($$(Icon, {icon: "fa-pencil"})),
      $$(LinkToolComponent, {
        tool: 'link',
        'title': 'Link',
        children: [$$(Icon).addProps({icon: "fa-link"})]
      }).addClass('tool'),
      $$(ToolComponent, {tool: 'todo', 'title': 'Create Todo'}).append($$(Icon, {icon: "fa-check-square-o"}))
    ]);
  }
});

module.exports = Toolbar;