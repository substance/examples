'use strict';

var Component = require('substance/ui/Component');

function InputComponent() {
  InputComponent.super.apply(this, arguments);
}

InputComponent.Prototype = function() {

  var _super = InputComponent.super.prototype;

  this.render = function($$) {
    var el = $$('div').addClass('sc-input');
    var input = $$('input').ref('input')
      .val(this.props.node.content);
    if (this.props.disabled) {
      el.addClass('sm-disabled');
      input.attr('disabled', true);
    } else {
      el.addClass('sm-active');
    }
    el.append(input);
    return el;
  };

  this.didUpdate = function(oldProps, oldState) {
    console.log('InputComponent.didUpdate', oldProps, oldState);
    var input = this.refs.input;
    var inputEl = input.getNativeElement();
    var val = inputEl.value;
    inputEl.focus();
    inputEl.setSelectionRange(val.length, val.length);
  };

};

Component.extend(InputComponent);

module.exports = InputComponent;
