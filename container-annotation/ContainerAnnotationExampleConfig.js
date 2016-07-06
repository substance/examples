'use strict';
var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var HighlightPackage = require('./highlight/HighlightPackage');

module.exports = {
  name: 'container-annotation-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(HighlightPackage);
  }
};
