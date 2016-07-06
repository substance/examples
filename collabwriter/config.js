'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');

module.exports = {
  name: 'collab-writer',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.addStyle(__dirname, 'app.scss');
  }
};
