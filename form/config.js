'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var EntityPackage = require('./entity/EntityPackage');

module.exports = {
  name: 'form-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(EntityPackage);
    config.addStyle(__dirname, 'app.scss');
  }
};
