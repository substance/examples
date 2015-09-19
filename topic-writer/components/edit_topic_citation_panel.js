'use strict';

var Substance = require('substance');
var _ = Substance._;
var OO = Substance.OO;
var Component = Substance.Component;
var Icon = require("substance/ui/font_awesome_icon");
var $$ = Component.$$;

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
    var surface = this.context.surface;

    surface.transaction(function(tx, args) {
      tx.set([this.props.topicCitationId, 'target'], topicId);
      return args;
    }.bind(this));

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
        $$('div').addClass('label').append("Choose a topic you want to reference")
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

  this.handleCancel = function(e) {
    e.preventDefault();
    this.send("switchContext", "toc");
  };
};

OO.inherit(EditTopicCitationPanel, Component);

module.exports = EditTopicCitationPanel;