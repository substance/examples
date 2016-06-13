var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');

module.exports = {
  name: 'my-prose-editor',
  configure: function(config) {
    config.import(ProseEditorPackage);
  }
};
