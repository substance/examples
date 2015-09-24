'use strict';

var Substance = require('substance');
var _ = Substance._;
var OO = Substance.OO;
var Component = Substance.Component;
var Icon = require("substance/ui/font_awesome_icon");
var Editor = require('substance/ui/editor');
var CommentToolbar = require('./comment_toolbar');
var $$ = Component.$$;
var createAnnotation = require('substance/document/transformations/create_annotation');

var CommentEditor = Editor.extend({
  config: {
    toolbar: CommentToolbar
  }
}); 

// EditCommentPanel
// --------------------------

function EditCommentPanel() {
  Component.apply(this, arguments);
}

EditCommentPanel.Prototype = function() {

  this.render = function() {
    var commentId = this.props.commentId;
    var comment = commentId ? this.props.doc.get(commentId) : {content: "<p>What's on your mind?</p>"};

    return $$('div').addClass("panel dialog edit-comment-panel-component").append(
      $$('div').addClass("dialog-header").append(
        $$('a').addClass('back').attr('href', '#')
          .on('click', this.handleCancel)
          .append($$(Icon, {icon: 'fa-chevron-left'})),
        $$('div').addClass('label').append("Write a comment"),
        $$('a').addClass('remove').attr('href', '#')
          .on('click', this.handleDelete)
          .append($$(Icon, {icon: 'fa-trash'}))
      ),
      $$('div').addClass("panel-content").append(
        $$('div').addClass("comment-editor").append(
          $$(CommentEditor, {content: comment.content}).ref('commentEditor'),
          $$('button').addClass('button action save-comment')
            .on('click', this.saveComment)
            .append('Save comment'),
          $$('button').addClass('button action cancel')
            .on('click', this.handleCancel)
            .append('Cancel') 
        )
      )
    );
  };

  this.saveComment = function(e) {
    var surface = this.context.controller.getSurface();
    var commentId = this.props.commentId;
    var comment = this.refs.commentEditor.getContent();
    if(commentId) {
      this.handleUpdate();
    } else {
      this.handleCreate();
    }

    this.handleCancel(e);
  };

  this.handleCreate = function() {
    var surface = this.context.controller.getSurface();
    var comment = this.refs.commentEditor.getContent();
    var sel = surface.getSelection();

    surface.transaction(function(tx, args) {
      args = createAnnotation(tx, {
        selection: sel,
        containerId: 'body',
        annotationType:'comment',
        annotationData: {
          content: comment
        }
      });

      return args;
    }.bind(this));
  };

  this.handleUpdate = function() {
    var surface = this.context.controller.getSurface();
    var comment = this.refs.commentEditor.getContent();

    surface.transaction(function(tx, args) {
      tx.set([this.props.commentId, 'content'], comment);
      return args;
    }.bind(this));
  };
  
  this.handleDelete = function(e) {
    e.preventDefault();
    
    var surface = this.context.controller.getSurface();
    var commentId = this.props.commentId;

    if (commentId) {
      surface.transaction(function(tx, args) {
        tx.delete(commentId);
      }.bind(this));
    }

    this.handleCancel(e);
  }

  this.handleCancel = function(e) {
    e.preventDefault();
    this.send("switchContext", "toc");
  };
};

OO.inherit(EditCommentPanel, Component);

module.exports = EditCommentPanel;