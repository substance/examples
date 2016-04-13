'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var $$ = Component.$$;

function InsertEntityTool() {
  InsertEntityTool.super.apply(this, arguments);
}

InsertEntityTool.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this.renderButton = function() {
    var button = _super.renderButton.call(this);
    button.append($$(Icon, {icon: 'fa-space-shuttle'} ));
    return button;
  };

};

SurfaceTool.extend(InsertEntityTool);

InsertEntityTool.static.name = 'insert-entity';

module.exports = InsertEntityTool;
