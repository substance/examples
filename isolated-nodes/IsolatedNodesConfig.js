var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');

var AlienNode = require('./alien/AlienNode');
var AlienComponent = require('./alien/AlienComponent');
var InsertAlienCommand = require('./alien/InsertAlienCommand');
var InsertAlienTool = require('./alien/InsertAlienTool');

var EntityNode = require('./entity/EntityNode');
var EntityComponent = require('./entity/EntityComponent');
var InsertEntityCommand = require('./entity/InsertEntityCommand');
var InsertEntityTool = require('./entity/InsertEntityTool');

var ContainerComponent = require('./container/ContainerComponent');
var InsertContainerCommand = require('./container/InsertContainerCommand');
var InsertContainerTool = require('./container/InsertContainerTool');

var InputNode = require('./input/InputNode');
var InputComponent = require('./input/InputComponent');

var InlineEntityNode = require('./inline-entity/InlineEntityNode');
var InlineEntityComponent = require('./inline-entity/InlineEntityComponent');


module.exports = function(config) {
  // Base package with default rich text nodes
  config.import(ProseEditorPackage);

  config.addNode(AlienNode);
  config.addNode(EntityNode);
  config.addNode(InputNode);
  config.addNode(InlineEntityNode);

  config.addComponent('alien', AlienComponent);
  config.addComponent('entity', EntityComponent);
  config.addComponent('container', ContainerComponent);
  config.addComponent('input', InputComponent);
  config.addComponent('inline-entity', InlineEntityComponent);

  config.addCommand(InsertAlienCommand);
  config.addCommand(InsertEntityCommand);
  config.addCommand(InsertContainerCommand);

  config.addTool(InsertAlienTool);
  config.addTool(InsertEntityTool);
  config.addTool(InsertContainerTool);

};
