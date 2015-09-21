'use strict';

var Substance = require('substance');
var _ = require('substance/helpers');
var OO = Substance.OO;
var Writer = require("substance/ui/writer");
var Component = require('substance/ui/component');
var $$ = Component.$$;

var ContextToggles = require('substance/ui/writer/context_toggles');
var ContentPanel = require("substance/ui/writer/content_panel");
var StatusBar = require("substance/ui/writer/status_bar");
var ModalPanel = require('substance/ui/writer/modal_panel');
var ContentToolbar = require('./components/content_toolbar');

var components = require('./components');
var commands = require('./commands');

function TopicWriter(parent, params) {
  // We can define the config here
  params.props.config = {
    panelOrder: ['toc'],
    containerId: 'body',
    components: components,
    commands: commands
  };

  Writer.call(this, parent, params);
}

TopicWriter.Prototype = function() {

  this.getInitialState = function() {
    return {'contextId': 'editTopicCitation', 'topicCitationId': 'topic_citation_1'};
  };

  this.render = function() {
    var doc = this.props.doc;
    var el = $$('div').addClass('writer-component');

    // Basic 2-column layout
    // -------------

    // Main container (where the main doc goes)
    el.append(
      $$('div').ref('mainContainer').addClass("main-container").append(
        $$(ContentToolbar).ref('toolbar'),
        $$(ContentPanel, {
          doc: doc,
          containerId: this.config.containerId
        }).ref('content')
      )
    );
    // Resource container
    el.append(
      $$('div').ref('resource-container')
        .addClass("resource-container")
        .append(
          $$(ContextToggles, {panelOrder: this.config.panelOrder}).ref("context-toggles"),
          this.renderContextPanel()
        )
    );

    // Status bar
    el.append(
      $$(StatusBar).ref('statusBar').setProps({ doc: doc })
    );
    // Clipboard
    el.append(
      $$('div').ref('clipboard').addClass("clipboard")
    );
    return el;
  };

  this.renderContextPanel = function() {
    var panelElement = this.getActivePanelElement();
    if (!panelElement) {
      return $$('div').append("No panels are registered");
    } else {
      return $$('div').ref('context-panel').append(panelElement);
    }
  };

  this.onSelectionChanged = function(sel, surface) {
    var contentContainer = surface.getContainer();
    var doc = this.getDocument();

    // Skip if selection did not change
    // TODO: this should probably be checked before we
    // emit the selection:changed event
    if (sel.equals(this.prevSelection)) {
      return;
    }

    this.prevSelection = sel;

    if (sel.isNull() || !sel.isPropertySelection() || !sel.isCollapsed()) return false;
    if (surface.getContainerId() !== "body") return false;

    // From topics panel
    // ---------------
    //

    var annotations = doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "topic_citation");

    if (annotations.length > 0) {
      var topicCitation = annotations[0];
      // Trigger state change
      this.setState({
        contextId: "editTopicCitation",
        topicCitationId: topicCitation.id,
        noScroll: true
      });
      return true;
    }
  };

  // Hande Writer state change updates
  // --------------
  // 
  // Here we update highlights

  this.handleStateUpdate = function(newState) {
    var oldState = this.state;
    var doc = this.getDocument();

    function getActiveNodes(state) {
      if (!state) return [];

      // Topic citations
      // --------------------
      //

      if (state.contextId === "topics" && state.topicId) {
        // Use reference handler
        return _.map(doc.entityReferencesIndex.get(state.topicId));
      } else if (state.topicCitationId) {
        return [ state.topicCitationId ];
      }
      return [];
    }

    var activeAnnos = _.compact(getActiveNodes(newState));

    if (activeAnnos.length > 0) {
      doc.setHighlights(activeAnnos);
      return true;
    } else {
      return false;
    }
  }

};

OO.inherit(TopicWriter, Writer);

module.exports = TopicWriter;