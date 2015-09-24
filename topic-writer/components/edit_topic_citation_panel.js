'use strict';

var Substance = require('substance');
var _ = Substance._;
var OO = Substance.OO;
var Component = Substance.Component;
var Icon = require("substance/ui/font_awesome_icon");
var $$ = Component.$$;
var createAnnotation = require('substance/document/transformations/create_annotation');

var Topic = Component.extend({
  onClick: function() {
    this.send('selectTopic', this.props.topic.id);
  },
  render: function() {
    var el = $$('a')
      .addClass('topic')
      .attr('href', '#')
      .on('click', this.onClick);

    if (this.props.active) {
      el.addClass('active');
    }

    el.append([
      $$('div')
        .addClass('name')
        .append(this.props.topic.name)
    ]);
    return el;
  }
});

// EditTopicCitationPanel
// --------------------------

function EditTopicCitationPanel() {
  Component.apply(this, arguments);
  this.actions({
    "selectTopic": this.selectTopic
  });
}

EditTopicCitationPanel.Prototype = function() {

  this.selectTopic = function(topicId) {
    var topicCitationId = this.props.topicCitationId;
    if (topicCitationId) {
      this.handleUpdate(topicId);
    } else {
      this.handleCreate(topicId);
    }

    this.rerender();
  };

  this.render = function() {
    var topicEls;

    if (this.state.topics) {
      topicEls = this.state.topics.map(function(topic) {
        return $$(Topic, {
          topic: topic,
          active: this.isTopicActive(topic.id)
        });
      }.bind(this));
    } else {
      topicEls = [$$('div')];
    }

    return $$('div').addClass("panel dialog edit-topic-citation-panel-component").append(
      $$('div').addClass("dialog-header").append(
        $$('a').addClass('back').attr('href', '#')
          .on('click', this.handleCancel)
          .append($$(Icon, {icon: 'fa-chevron-left'})),
        $$('div').addClass('label').append("Choose a topic you want to reference"),
        $$('a').addClass('remove').attr('href', '#')
          .on('click', this.handleDelete)
          .append($$(Icon, {icon: 'fa-trash'}))
      ),
      $$('div').addClass("panel-content").append(
        $$('div').addClass("topics").append(
          topicEls
        )
      )
    );
  };

  this.didMount = function() {
    var backend = this.context.backend;
    backend.getTopics(function(err, topics) {
      this.setState({
        topics: topics
      });
    }.bind(this));
  };

  // Determines wheter an item is active
  this.isTopicActive = function(topicId) {
    if (!this.props.topicCitationId) return false;
    var doc = this.props.doc;
    var citation = doc.get(this.props.topicCitationId);
    return citation.target === topicId;
  };

  this.handleCreate = function(topicId) {
    var surface = this.context.controller.getSurface();
    var sel = surface.getSelection();
    var topicCitationId;

    surface.transaction(function(tx, args) {
      args = createAnnotation(tx, {
        selection: sel,
        containerId: 'body',
        annotationType:'topic_citation',
        annotationData: {
          target: topicId
        }
      });

      topicCitationId = args.result.id;

      return args;
    }.bind(this));

    this.extendProps({
      topicCitationId: topicCitationId
    });
  };

  this.handleUpdate = function(topicId) {
    var surface = this.context.controller.getSurface();
    
    surface.transaction(function(tx, args) {
      tx.set([this.props.topicCitationId, 'target'], topicId);
      return args;
    }.bind(this));
  };

  this.handleDelete = function(e) {
    e.preventDefault();

    var surface = this.context.controller.getSurface();
    var topicCitationId = this.props.topicCitationId;

    if (topicCitationId) {
      surface.transaction(function(tx, args) {
        tx.delete(topicCitationId);
      }.bind(this));
    }

    this.handleCancel(e);
  };

  this.handleCancel = function(e) {
    e.preventDefault();
    this.send("switchContext", "toc");
  };
};

OO.inherit(EditTopicCitationPanel, Component);

module.exports = EditTopicCitationPanel;