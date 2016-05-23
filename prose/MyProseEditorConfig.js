var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var ImagePackage = require('substance/packages/image/ImagePackage');

module.exports = function(config) {
  // Base package with default rich text nodes
  config.import(ProseEditorPackage);
  // Custom packages
  config.import(ImagePackage, {icon: 'fa-image'});
};
