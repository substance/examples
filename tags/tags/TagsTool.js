/* jshint latedef:nofunc */
'use strict';

var extend = require('lodash/extend');
var includes = require('lodash/includes');
var capitalize = require('lodash/capitalize');
var _ = require('substance/util/helpers');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

var SurfaceTool = require('substance/ui/SurfaceTool');

function TagsTool() {
  SurfaceTool.apply(this, arguments);

  var ctrl = this.getController();
  ctrl.on('command:executed', this.onCommandExecuted, this);
}

TagsTool.Prototype = function() {

  this.dispose = function() {
    var ctrl = this.getController();
    ctrl.off(this);
  };

  this.onCommandExecuted = function(info, commandName) {
    if (commandName === this.constructor.static.command) {
      if (includes(['edit','create'], info.mode)) {
        this.togglePrompt();
      }
    }
  };

  this.togglePrompt = function() {
    var newState = extend({}, this.state, {showPrompt: !this.state.showPrompt});
    this.setState(newState);
  };

  this.updateTags = function(tags) {
    var tagsAnno = this.getTagsAnno();

    this.getSurface().transaction(function(tx) {
      tx.set([tagsAnno.id, "tags"], tags);
    });
    this.togglePrompt();
  };

  this.deleteAllTags = function() {
    var tagsAnno = this.getTagsAnno();

    this.getSurface().transaction(function(tx) {
      tx.delete(tagsAnno.id);
    });
    this.togglePrompt();
  };

  this.getTagsAnno = function() {
    return this.getDocument().get(this.state.annotationId);
  };


  this.render = function() {
    var title = this.props.title || capitalize(this.getName());

    if (this.state.mode) {
      title = [capitalize(this.state.mode), title].join(' ');
    }

    var el = $$('div')
      .addClass('sc-tags-tool se-tool')
      .attr('title', title);

    if (this.state.disabled) {
      el.addClass('sm-disabled');
    }

    if (this.state.mode === 'edit') {
      el.addClass('sm-active');
    }

    if (this.state.mode) {
      el.addClass(this.state.mode);
    }

    var button = $$("button").on('click', this.onClick);

    button.append(this.props.children);
    el.append(button);

    if (this.state.mode === 'edit' && this.state.showPrompt) {
      var tagsAnno = this.getTagsAnno();
      var prompt = $$(EditTagsPrompt, {tags: tagsAnno, tool: this});
      el.append(prompt);
    }
    return el;
  };
};

SurfaceTool.extend(TagsTool);

TagsTool.static.name = 'tags';
TagsTool.static.command = 'tags';

function EditTagsPrompt() {
  Component.apply(this, arguments);
}

EditTagsPrompt.Prototype = function() {

  this.didMount = function() {
    var input = this.refs.tags;
    setTimeout(function() {
      input.focus();
    });
  };

  this.render = function() {
    var self = this;

    var tags = this.props.tags.tags;
    var el = $$('div').addClass('se-prompt');

    var tagsWidget = $$('div').addClass('se-tags');
    _.each(tags, function(tag){
      tagsWidget.append($$('div').addClass('se-tag').append(tag).on('click', self.removeTag));
    });


    el.append([
      $$('div').addClass('se-prompt-title').append(this.i18n.t('Tags')),
      tagsWidget,
      $$('input').attr({type: 'text', placeholder: 'Add tag'})
                 .ref('tags')
                 .htmlProp('autofocus', true)
                 .on('keyup', this.onKeyUp),
      $$('a').attr({href: '#'})
             .addClass('se-delete-tag')
             .append(this.i18n.t('delete'))
             .on('click', this.onDelete),
      $$('a').attr({href: '#'})
             .addClass('se-close-prompt')
             .append($$('i').addClass('fa fa-check-square-o '))
             .on('click', this.onClose)
    ]);
    return el;
  };

  this.onKeyUp = function(e) {
    var key = e.keyCode || e.which;
    if (key === 13 || key === 188) {
      var tag = this.refs.tags.val().replace(',', '');
      this.addTag(tag);
      return this.refs.tags.val('');
    } else if (key === 8) {
      if (this.refs.tags.val() === '') {
        return this.deleteTag(tag);
      }
    } else if (key == 27) {
      this.props.tool.togglePrompt();
    }
  };

  this.addTag = function(tag) {
    var tags = this.props.tags.tags;
    tags.push(tag);
    this.props.tool.updateTags(tags);
  };

  this.removeTag = function(e) {
    e.preventDefault();
    var el = e.target;
    var highlighted = el.classList.contains('se-hihglight-remove');
    if(highlighted) {
      this.deleteTag(el.textContent);
    } else {
      _.each(el.parentElement.childNodes,function(node){
        node.className = 'se-tag';
      });
      el.className += ' se-hihglight-remove';
    };
  }

  this.deleteTag = function(tag) {
    var tags = this.props.tags.tags;
    var pos = tags.indexOf(tag);
    tags.splice(pos, 1);
    this.props.tool.updateTags(tags);
  };

  this.onDelete = function(e) {
    e.preventDefault();
    this.props.tool.deleteAllTags();
  };

  this.onClose = function(e) {
    e.preventDefault();
    this.props.tool.togglePrompt();
  };

};

Component.extend(EditTagsPrompt);

module.exports = TagsTool;
