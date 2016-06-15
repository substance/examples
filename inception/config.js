'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var RecursivePackage = require('./recursive/RecursivePackage');

module.exports = {
  name: 'inception',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(RecursivePackage);
  }
};
