'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var ScriptPackage = require('./script/ScriptPackage');

module.exports = {
  name: 'code-editor-example',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(ScriptPackage);
  }
};
