'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Icon = require('substance/ui/FontAwesomeIcon');

function InsertContainerTool() {
  InsertContainerTool.super.apply(this, arguments);
}

InsertContainerTool.Prototype = function() {

  var _super = InsertContainerTool.super.prototype;

  this.renderButton = function($$) {
    var button = _super.renderButton.apply(this, arguments);
    button.append($$(Icon, {icon: 'fa-file-text-o'} ));
    return button;
  };

};

SurfaceTool.extend(InsertContainerTool);

InsertContainerTool.static.name = 'insert-container';

module.exports = InsertContainerTool;
