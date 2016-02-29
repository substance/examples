'use strict';

var extend = require('lodash/extend');
var Form = require('./forms/Form');
var ControllerTool = require('substance/ui/ControllerTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function MetaDataTool() {
  MetaDataTool.super.apply(this, arguments);

  var ctrl = this.getController();
  ctrl.on('command:executed', this.onCommandExecuted, this);
}

MetaDataTool.Prototype = function() {

	this.dispose = function() {
    var ctrl = this.getController();
    ctrl.off(this);
  };

  this.getDocumentSession = function() {
    var ctrl = this.getController();
    return ctrl.getDocumentSession();
  };

	this.onCommandExecuted = function(info, commandName) {
    if (commandName === this.constructor.static.command) {
      this.toggleModal(info);
    }
  };
  this.shouldRerender = function(newProps, newState) {
    if(!newState.showModal && !newState.hideModal) {
      newState.showModal = true;
      return false;
    }
    return true;
  };

	this.toggleModal = function() {
    var modalState = !this.state.showModal;
    var hideModal = modalState ? false : true;
    //console.log(modalState, hideModal)
    this.extendState({showModal: modalState, hideModal: hideModal});
  };

  this.getMetadata = function() {
  	var doc = this.getDocument();
  	var metadata = doc.get('metadata');
  	return metadata;
  };

  this.render = function() {
  	var title = this.getName();

    var el = $$('div')
      .addClass('sc-metadata-tool se-tool')
      .attr('title', title);

    if (this.state.disabled) {
      el.addClass('sm-disabled');
    }

    if (this.state.showModal) {
      el.addClass('sm-active');
    }

    var button = $$("button").on('click', this.onClick);

    button.append(this.props.children);
    el.append(button);

    if (this.state.showModal && !this.state.hideModal) {
    	var metadata = this.getMetadata();
      var form = $$(Form, {node: metadata, tool: this});
      var modal = $$('div').addClass('se-modal');
      modal.append(form);
      el.append(modal);
    }
    return el;
  };
}

ControllerTool.extend(MetaDataTool);
MetaDataTool.static.name = 'Metadata Editor';
MetaDataTool.static.command = 'metadata';

module.exports = MetaDataTool;