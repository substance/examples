'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var InlineImagePackage = require('./inline-image/InlineImagePackage');

module.exports = {
  name: 'inline-nodes-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(InlineImagePackage);
    config.addStyle(__dirname+'/app.scss');
  }
};
