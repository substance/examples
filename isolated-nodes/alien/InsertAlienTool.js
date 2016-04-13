'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function InsertAlienTool() {
  InsertAlienTool.super.apply(this, arguments);
}

InsertAlienTool.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this.renderButton = function() {
    var button = _super.renderButton.call(this);
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
