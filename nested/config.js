'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var ContainerPackage = require('./container/ContainerPackage');

module.exports = {
  name: 'form-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(ContainerPackage);
    config.addStyle(__dirname, 'app.scss');
  }
};
