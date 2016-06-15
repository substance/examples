'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var InputPackage = require('./input/InputPackage');

module.exports = {
  name: 'InputExample',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(InputPackage);
  }
};