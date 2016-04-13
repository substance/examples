'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Icon = require('substance/ui/FontAwesomeIcon');

function InsertEntityTool() {
  InsertEntityTool.super.apply(this, arguments);
}

InsertEntityTool.Prototype = function() {

  var _super = InsertEntityTool.super.prototype;

  this.renderButton = function($$) {
    var button = _super.renderButton.apply(this, arguments);
    button.append($$(Icon, {icon: 'fa-space-shuttle'} ));
    return button;
  };

};

SurfaceTool.extend(InsertEntityTool);

InsertEntityTool.static.name = 'insert-entity';

module.exports = InsertEntityTool;
