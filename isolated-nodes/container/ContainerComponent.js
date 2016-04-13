'use strict';

var ContainerEditor = require('substance/ui/ContainerEditor');

function ContainerComponent() {
  ContainerComponent.super.apply(this, arguments);
}

ContainerEditor.extend(ContainerComponent);

module.exports = ContainerComponent;
