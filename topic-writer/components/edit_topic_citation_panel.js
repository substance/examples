'use strict';

var Substance = require('substance');
var _ = Substance._;
var OO = Substance.OO;
var Component = Substance.Component;
var Icon = require("substance/ui/font_awesome_icon");
var $$ = Component.$$;

var Topic = Component.extend({
  render: function() {
    var el = $$('a').attr('href', '#').addClass('topic');

    if (this.props.active) {
      el.addClass('active');
    }

    el.append([
      $$('div').addClass('name').append(this.props.topic.name)
    ]);
    return el;
  }
});

function EditTopicCitationPanel() {
  Component.apply(this, arguments);
}

EditTopicCitationPanel.Prototype = function() {

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
      console.log('init');
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
    console.log('EditTopicCitationPanel.didMount');
    var backend = this.context.backend;
    backend.getTopics(function(err, topics) {
      this.setState({
        topics: topics
      });
    }.bind(this));

    // this.tool = this.context.toolRegistry.get('cite');
    // if (!this.tool) throw new Error('cite tool not found in registry');
  };

  this.willUnmount = function() {
    // this.$el.off('click', '.back', this.handleCancel);
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

  this.getItems = function(citationType) {
    var doc = this.props.doc;
    var collection = doc.getCollection(citationType);
    return collection.getItems();
  };

  // Called with entityId when an entity has been clicked
  this.handleSelection = function(targetId) {
    // var citationId = this.props.citationId;
    // this.tool.toggleTarget(citationId, targetId);
    // this.rerender();
  };
};

OO.inherit(EditTopicCitationPanel, Component);

// Panel configuration
// ----------------

EditTopicCitationPanel.icon = "fa-bullseye";

// No context switch toggle is shown
EditTopicCitationPanel.isDialog = true;

module.exports = EditTopicCitationPanel;