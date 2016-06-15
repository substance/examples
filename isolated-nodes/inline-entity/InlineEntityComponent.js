'use strict';

var InlineNodeComponent = require('substance/ui/InlineNodeComponent');
var Modal = require('substance/ui/Modal');
var EntityComponent = require('../entity/EntityComponent');
var Icon = require('substance/ui/FontAwesomeIcon');

function InlineEntityComponent() {
  InlineEntityComponent.super.apply(this, arguments);

  this.handleActions({
    'closeModal': this._closeModal
  });
}

InlineEntityComponent.Prototype = function() {

  var _super = InlineEntityComponent.super.prototype;

  this.render = function($$) {
    var el = _super.render.apply(this, arguments);
    el.addClass('sc-inline-entity')
      .on('mousedown', this.onMousedown);

    var node = this.props.node;
    el.append(node.name);

    if (this.state.edit) {
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(this.renderModal($$))
      );
    }

    // shadowing handlers of the parent surface
    el.on('keydown', this._stopPropagation)
      .on('keypress', this._stopPropagation)
      .on('keyup', this._stopPropagation)
      .on('compositionstart', this._stopPropagation)
      .on('textInput', this._stopPropagation);

    return el;
  };

  this.renderModal = function($$) {
    var node = this.props.node;
    return [
      $$('div').addClass('se-modal-buttons').append(
        $$('button').addClass('sm-close')
          .on('click', this.onClickCloseModal)
          .append($$(Icon, {icon: 'fa-close'}))
      ),
      $$(EntityComponent, {node: node})
    ];
  };

  this.onMousedown = function(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      edit: !this.state.edit
    });
  };

  this.onClickCloseModal = function(event) {
    event.stopPropagation();
    this._closeModal();
  };

  this._openModal = function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      edit: true
    });
  };

  this._closeModal = function() {
    this.setState({
      edit: false
    });
  };

  this._stopPropagation = function(event) {
    event.stopPropagation();
  };

};

InlineNodeComponent.extend(InlineEntityComponent);

module.exports = InlineEntityComponent;
