'use strict';

var Component = require('substance/ui/Component');

function InputComponent() {
  InputComponent.super.apply(this, arguments);
}

InputComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('input').addClass('sc-input')
      .val(this.props.node.content)
      .on('mousedown', this.onMousedown)
      .on('keydown', this.onKeydown);
    if (this.props.disabled) {
      el.attr('disabled', true);
    }
    return el;
  };

  this.didUpdate = function() {
    if (!this.props.disabled) {
      // this.el.focus();
    }
  };

  this.onMousedown = function(event) {
    event.stopPropagation();
  };

  this.onKeydown = function(event) {
    console.log('AAAAAA');
    event.stopPropagation();
  };

};

Component.extend(InputComponent);

module.exports = InputComponent;
