'use strict';

var extend = require('lodash/extend');
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

	this.onCommandExecuted = function(info, commandName) {
    if (commandName === this.constructor.static.command) {
      this.toggleModal();
    }
  };

	this.toggleModal = function() {
    var newState = extend({}, this.state, {showModal: !this.state.showModal});
    this.setState(newState);
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

    if (this.state.showModal) {
      var modal = $$('div').addClass('se-modal');
      el.append(modal);
    }
    return el;
  };
}

ControllerTool.extend(MetaDataTool);
MetaDataTool.static.name = 'Metadata Editor';
MetaDataTool.static.command = 'metadata';

module.exports = MetaDataTool;