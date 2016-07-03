'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var InlinePropertyPackage = require('./inline-property/package');

module.exports = {
  name: 'inline-property-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(InlinePropertyPackage);
    config.addStyle(__dirname+'/app.scss');
  }
};
