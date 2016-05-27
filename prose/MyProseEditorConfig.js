var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var ImagePackage = require('substance/packages/image/ImagePackage');

var SaveCommand = require('substance/ui/SaveCommand');
var SaveTool = require('substance/ui/SaveTool');

module.exports = function(config) {
  // Base package with default rich text nodes
  config.import(ProseEditorPackage);
  // Custom packages
  config.import(ImagePackage, {icon: 'fa-image'});

  // Activate save tool
  config.addCommand(SaveCommand);
  config.addTool(SaveTool, {icon: 'fa-save'});
};
