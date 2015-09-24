'use strict';

var Component = require('substance/ui/component');
var $$ = Component.$$;

var Icon = require('substance/ui/font_awesome_icon');
var UndoTool = require('substance/ui/tools/undo_tool');
var RedoTool = require('substance/ui/tools/redo_tool');
var SaveTool = require('substance/ui/tools/save_tool');
var TextTool = require('substance/ui/tools/text_tool');
var StrongTool = require('substance/ui/tools/strong_tool');
var EmphasisTool = require('substance/ui/tools/emphasis_tool');
var LinkTool = require('substance/ui/tools/link_tool');
var TopicCitationTool = require('../tools/topic_citation_tool');
var CommentTool = require('../tools/comment_tool');

var ContentToolbar = Component.extend({
  displayName: "ContentToolbar",

  render: function() {
    var el = $$('div').addClass('toolbar');
    el.append(
      $$(TextTool, {'title': 'Switch text'}),
      $$(UndoTool).append($$(Icon, {icon: "fa-undo"})),
      $$(RedoTool).append($$(Icon, {icon: "fa-repeat"})),
      $$(SaveTool).append($$(Icon, {icon: "fa-save"})),
      $$(StrongTool).append($$(Icon, {icon: "fa-bold"})),
      $$(EmphasisTool).append($$(Icon, {icon: "fa-italic"})),
      $$(LinkTool).append($$(Icon, {icon: "fa-link"})),
      $$(TopicCitationTool).append($$(Icon, {icon: "fa-tag"})),
      $$(CommentTool).append($$(Icon, {icon: "fa-comment"}))
    );
    return el;
  }
});

module.exports = ContentToolbar;