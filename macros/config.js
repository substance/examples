'use strict';

var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
// Look inside ListMacro.js in Substance to learn how macros are written.
var ListMacro = require('substance/packages/list/ListMacro');

module.exports = {
  name: 'my-prose-editor',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.addMacro(ListMacro);
    config.addStyle(__dirname, 'app.scss');
  }
};
