'use strict';

var Component = require('substance/ui/Component');

function InputComponent() {
  InputComponent.super.apply(this, arguments);
}

InputComponent.Prototype = function() {

  // Register for model side updates
  this.didMount = function() {
    this.props.node.on('content:changed', this.onContentChange, this);
  };

  // And please always deregister
  this.dispose = function() {
    this.props.node.off(this);
  };

  this.render = function($$) {
    var el = $$('div').addClass('sc-input');
    var input = $$('input').ref('input')
      .val(this.props.node.content)
      .on('change', this.onChange);
    // you should disable the input when the parent asks you to do so
    if (this.props.disabled) {
      input.attr('disabled', true);
    }

    el.append(input);
    return el;
  };

  // this is called when the input's content has been changed
  this.onChange = function() {
    var documentSession = this.context.documentSession;
    var node = this.props.node;
    var newVal = this.refs.input.val();
    documentSession.transaction(function(tx) {
      tx.set([node.id, 'content'], newVal);
    });
  };

  // this is called when the model has changed, e.g. on undo/redo
  this.onContentChange = function() {
    this.refs.input.val(this.props.node.content);
  };

};

Component.extend(InputComponent);

module.exports = InputComponent;
