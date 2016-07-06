'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var ExpressionPackage = require('./expression/package');
var ExpressionReferencePackage = require('./expression-reference/package');

module.exports = {
  name: 'tangle-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(ExpressionPackage);
    config.import(ExpressionReferencePackage);
    config.addStyle(__dirname, 'app.scss');
  }
};
