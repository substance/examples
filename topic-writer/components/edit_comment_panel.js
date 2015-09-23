'use strict';

var Substance = require('substance');
var _ = Substance._;
var OO = Substance.OO;
var Component = Substance.Component;
var Icon = require("substance/ui/font_awesome_icon");
var Editor = require('substance/ui/editor');
var $$ = Component.$$;



// EditCommentPanel
// --------------------------

function EditCommentPanel() {
  Component.apply(this, arguments);
  this.actions({
    "saveComment": this.saveComment
  });
}

EditCommentPanel.Prototype = function() {

  this.saveComment = function(topicId) {
    var surface = this.context.surface;
    var comment = this.commentEditor.getContent();
    surface.transaction(function(tx, args) {
      tx.set([this.props.comment.id, 'content'], comment);
      return args;
    }.bind(this));

    this.handleCancel(e);
  };



  this.render = function() {

    var comment = this.props.doc.get(this.props.commentId);

    return $$('div').addClass("panel dialog edit-comment-panel-component").append(
      $$('div').addClass("dialog-header").append(
        $$('a').addClass('back').attr('href', '#')
          .on('click', this.handleCancel)
          .append($$(Icon, {icon: 'fa-chevron-left'})),
        $$('div').addClass('label').append("Write a comment")
      ),
      $$('div').addClass("panel-content").append(
        $$('div').addClass("comments").append(
          //comment.content
          $$(Editor, {content: comment.content})
        )
      )
    );
  };

  
  this.handleDelete = function(e) {
    e.preventDefault();
    var surface = this.context.surface;
    surface.transaction(function(tx, args) {
      tx.delete(this.props.comment.id);
    }.bind(this));

    this.handleCancel(e);
  }

  this.handleCancel = function(e) {
    e.preventDefault();
    this.send("switchContext", "toc");
  };
};

OO.inherit(EditCommentPanel, Component);

module.exports = EditCommentPanel;