'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');

var AlienPackage = require('./alien/AlienPackage');
var EntityPackage = require('./entity/EntityPackage');
var ContainerPackage = require('./container/ContainerPackage');
var InputPackage = require('./input/InputPackage');
var InlineEntityPackage = require('./inline-entity/InlineEntityPackage');

module.exports = {
  name: 'IsolatedNodes',
  configure: function(config) {
    // Base package with default rich text nodes
    config.import(ProseEditorPackage);

    config.import(AlienPackage);
    config.import(EntityPackage);
    config.import(ContainerPackage);
    config.import(InputPackage);
    config.import(InlineEntityPackage);
  }
};