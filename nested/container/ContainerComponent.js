'use strict';

var Component = require('substance/ui/Component');
var ContainerEditor = require('substance/ui/ContainerEditor');

function ContainerComponent() {
  ContainerComponent.super.apply(this, arguments);
}

ContainerComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-container');
    el.append(
      $$(ContainerEditor, {
        node: this.props.node
      }).ref('editor')
    );
    return el;
  };

};

Component.extend(ContainerComponent);

ContainerComponent.static.fullWidth = true;

module.exports = ContainerComponent;
