'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var ExpressionPackage = require('./expression');
var ExpressionReferencePackage = require('./expression-reference');

module.exports = {
  name: 'hybrid-inline-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(ExpressionPackage);
    config.import(ExpressionReferencePackage);
  }
};
