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
var stateHandlers = require('./state_handlers');


// Ideas:
// 
// - Remove fixed things like contentToolbar from registry

function TopicWriter(parent, params) {
  params.props.config = {
    panelOrder: ['toc'],
    containerId: 'body',
    components: components,
    stateHandlers: stateHandlers
  };

  Writer.call(this, parent, params);
}

TopicWriter.Prototype = function() {

  this._panelPropsFromState = function (state) {
    var props = _.omit(state, 'contextId');
    props.doc = this.props.doc;
    return props;
  };

  this._getActivePanelElement = function() {
    if (this.componentRegistry.contains(this.state.contextId)) {
      var panelComponent = this.componentRegistry.get(this.state.contextId);
      return $$(panelComponent).setProps(this._panelPropsFromState(this.state));
    } else {
      console.warn("Could not find component for contextId:", this.state.contextId);
    }
  };

  this._getActiveModalPanelElement = function() {
    var state = this.state;
    if (state.modal) {
      var modalPanelComponent = this.componentRegistry.get(state.modal.contextId);
      if (modalPanelComponent) {
        return $$(modalPanelComponent).setProps(this._panelPropsFromState(state.modal));
      } else {
        console.warn("Could not find component for contextId:", state.modal.contextId);
      }
    }
  };

  this.getInitialState = function() {
    return {"contextId": "toc"};
  };

  this.openModal = function(modalState) {
    var newState = _.cloneDeep(this.state);
    newState.modal = modalState;
    this.setState(newState);
  };

  // handles 'close-modal'
  this.closeModal = function() {
    var newState = _.cloneDeep(this.state);
    delete newState.modal;
    this.setState(newState);
  };

  this.render = function() {
    var doc = this.props.doc;
    var el = $$('div').addClass('writer-component');

    if (!doc) {
      return el.append($$('div').append('Loading'));
    }

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
    // Modal panel, if active
    if (this.state.modal) {
      el.append(
        this.renderModalPanel()
      );      
    }

    // status bar
    el.append(
      $$(StatusBar).ref('statusBar').setProps({ doc: doc })
    );
    // clipboard
    el.append(
      $$('div').ref('clipboard').addClass("clipboard")
    );

    return el;
  };

  this.renderModalPanel = function() {
    var modalPanelElement = this._getActiveModalPanelElement();
    if (!modalPanelElement) {
      // Just render an empty div if no modal active available
      return $$('div');
    } else {
      var el = $$(ModalPanel).ref('modal-panel').setProps({
        panelElement: modalPanelElement
      });
      if (this.state.modal) {
        el.extendProps(this.state.modal);
      }
      return el;
    }
  };

  this.renderContextPanel = function() {
    var panelElement = this._getActivePanelElement();

    if (!panelElement) {
      return $$('div').append("No panels are registered");
    } else {
      return $$('div').ref('context-panel').append(panelElement);
    }
  };
};

OO.inherit(TopicWriter, Writer);

module.exports = TopicWriter;