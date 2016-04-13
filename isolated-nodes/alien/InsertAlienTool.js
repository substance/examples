'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');

function InsertAlienTool() {
  InsertAlienTool.super.apply(this, arguments);
}

InsertAlienTool.Prototype = function() {

  var _super = InsertAlienTool.super.prototype;

  this.renderButton = function($$) {
    var button = _super.renderButton.apply(this, arguments);
    button.append($$('img').attr({
      src: 'alien/alien.svg',
      height: 12
    }));
    return button;
  };

};

SurfaceTool.extend(InsertAlienTool);

InsertAlienTool.static.name = 'insert-alien';

module.exports = InsertAlienTool;
