'use strict';

var InlineNodeComponent = require('substance/ui/InlineNodeComponent');
var TextPropertyEditor = require('substance/ui/TextPropertyEditor');

function InlinePropertyComponent() {
  InlinePropertyComponent.super.apply(this, arguments);
}

InlinePropertyComponent.Prototype = function() {

  var _super = InlinePropertyComponent.super.prototype;

  this.didMount = function() {
    _super.didMount.call(this);
    this.props.node.on('content:changed', this.rerender, this);
  };

  this.dispose = function() {
    _super.dispose.call(this);
    this.props.node.off(this);
  };

  this.getClassNames = function() {
    // ATTENTION: ATM it is necessary to add .sc-inline-node
    return 'sc-inline-property sc-inline-node';
  };

  this.renderContent = function($$) {
    var node = this.props.node;
    var el = $$(TextPropertyEditor, {
      disabled: this.isDisabled(),
      tagName: 'span',
      path: [node.id, 'content'],
      withoutBreak: true
    }).ref('content');
    return el;
  };

};

InlineNodeComponent.extend(InlinePropertyComponent);

module.exports = InlinePropertyComponent;
